import Box from '@codeday/topo/Atom/Box'
import Text from '@codeday/topo/Atom/Text'
import Badge from '../interfaces/badge'

export default function({ badge } : { badge: Badge}) {
    return (
        <Box bg="gray.200" p={4} m={2}>
            <Text bold fontSize="xl">{badge.name} ({badge.points} points)</Text>
            <Text>{badge.description}</Text>
        </Box>
    )
}