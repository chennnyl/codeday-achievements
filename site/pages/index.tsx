import Page from '../components/Page'
import Text from '@codeday/topo/Atom/Text'
import Box from '@codeday/topo/Atom/Box'
import Content from '@codeday/topo/Molecule/Content'
import User from '../interfaces/user'
import Badge from '../interfaces/badge'
import UserBadges from '../interfaces/userbadge'
import UserBadgesDisplay from '../components/UserBadgesDisplay'

export default function Home({ userBadges } : { userBadges: UserBadges[] }) {
    const getTotalPoints = (ub : UserBadges) => ub.badges.reduce((p,c)=>p+c.points, 0)
    userBadges.sort((a, b) => getTotalPoints(b) - getTotalPoints(a))
    const topThree = userBadges.slice(0, Math.min(3, userBadges.length))
    let others: UserBadges[] = []; 
    if(userBadges.length > 3) {
        others = userBadges.slice(3)
    }
    return(
        <Page>
            <Content mt={-8}>
                <Text fontSize="6xl" bold>Achievements Leaderboard</Text>
                <Box>
                    {topThree.map((ub, i) => (
                        <Box key="ub.name">
                            <Text fontSize="4xl" bold>{i+1}. {ub.name} ({getTotalPoints(ub)} points)</Text>
                            <UserBadgesDisplay badges={ub.badges}/>
                        </Box>
                    ))}
                </Box>
                <Box>
                    {others.map((ub, i) => (
                        <Text key={ub.name} fontSize="2xl">{i+4}. {ub.name} ({getTotalPoints(ub)} points)</Text>
                    ))}
                </Box>
            </Content>
        </Page>
    )
}

export async function getServerSideProps() {
    const userRes = await fetch("http://localhost:3001/users")
    const users : User[] = await userRes.json()
    const badgeRes : UserBadges[] = [...await Promise.all(users.map(async (user): Promise<UserBadges> => {
        const userBadgesRes = await fetch(
            "http://localhost:3001/users/badges",
            {
                body: JSON.stringify({"name": user.name}),
                headers: {
                    "Content-Type": "application/json"
                },
                method: "POST"
            }
        )
        //rewrite to use new type
        const userBadges = (await userBadgesRes.json() as Badge[])
        let result : UserBadges = {name: "", badges: []};
        result.name = user.name;
        result.badges = userBadges;
        return result;
    }))]

    return { props: { userBadges : badgeRes } }
}