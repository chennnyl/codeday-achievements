import Page from '../components/Page'
import Badge from '../components/Badge'
import Text, { Heading } from '@codeday/topo/Atom/Text'
import Box, { Grid } from '@codeday/topo/Atom/Box'
import Content from '@codeday/topo/Molecule/Content'
import BadgeCategories from '../interfaces/categories'

export default function BadgePage({ categories } : { categories: BadgeCategories}) {
    return (
        <Page>
            <Content mt={-8}>
                <Text fontSize="6xl" bold>Achievement List</Text>
                {Object.entries(categories).map(entry => {
                    let category, badges
                    [category, badges] = entry

                    return (
                        <Box key={category}>
                            <Heading>{category}</Heading>
                            <Grid templateColumns="repeat(2, 1fr)">
                            {badges.map(
                                badge => (
                                    <Badge key={badge.name} badge={badge} />
                                )
                            )}
                            </Grid>
                        </Box>
                    )
                })}
                    
            </Content>
        </Page>
    )
}

export async function getServerSideProps() {
    const res = await fetch("http://localhost:3001/badges")
    const categories = await res.json()

    return { props: { categories: {...categories} } }
}