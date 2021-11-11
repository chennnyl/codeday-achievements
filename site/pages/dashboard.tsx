import Page from '../components/Page'
import Text from '@codeday/topo/Atom/Text'
import Content from '@codeday/topo/Molecule/Content'
import AddAchievement from '../components/AddAchievement'
import GrantAchievement from '../components/GrantAchievement'
import AddUser from '../components/AddUser'
import User from '../interfaces/user'
import Badge from '../interfaces/badge'

export default function Dashboard({ users, badgeNameList } : { users: User[], badgeNameList: string[] }) {
    return(
        <Page title="Dashboard">
            <Content mt={-8}>
                <Text fontSize="6xl" bold>Dashboard Home</Text>
                <Text fontSize="4xl" bold>Create an Achievement</Text>
                <AddAchievement/>
                <Text fontSize="4xl" bold>Grant an Achievement</Text>
                <GrantAchievement users={users} badgeNameList={badgeNameList} />
                <Text fontSize="4xl" bold>Add a User</Text>
                <AddUser/>
            </Content>
        </Page>
    )
}

export async function getServerSideProps() {
    const badgeRes = await fetch("http://flask:3001/badges")
    const userRes = await fetch("http://flask:3001/users")
    const badgeCategories = await badgeRes.json()
    const badgeNameList = Object.entries(badgeCategories).map((e)=>(e[1] as Badge[]).map(b=>b.name)).flat()
    const users = await userRes.json()

    return { props: { users, badgeNameList } }
}