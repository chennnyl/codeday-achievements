import Page from '../components/Page'
import Text from '@codeday/topo/Atom/Text'
import Content from '@codeday/topo/Molecule/Content'
import AddAchievement from '../components/AddAchievement'
import GrantAchievement from '../components/GrantAchievement'
import AddUser from '../components/AddUser'

export default function Dashboard() {
    return(
        <Page>
            <Content mt={-8}>
                <Text fontSize="6xl" bold>Dashboard Home</Text>
                <Text fontSize="4xl" bold>Create an Achievement</Text>
                <AddAchievement/>
                <Text fontSize="4xl" bold>Grant an Achievement</Text>
                <GrantAchievement/>
                <Text fontSize="4xl" bold>Add a User</Text>
                <AddUser/>
            </Content>
        </Page>
    )
}