import Page from '../components/Page'
import Text, { Heading } from '@codeday/topo/Atom/Text'
import Content from '@codeday/topo/Molecule/Content'

export default function Home() {
    return(
        <Page>
            <Content mt={-8}>
                <Heading as="h2">Achievements Leaderboard</Heading>
                <Text fontSize="lg">
                    Nothing to see here, folks.
                </Text>
            </Content>
        </Page>
    )
}