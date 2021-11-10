import Box from '@codeday/topo/Atom/Box'
import Text from '@codeday/topo/Atom/Text'
import Badge from '../interfaces/badge'

export default function BadgeComponent({ badge, isSmall} : { badge: Badge, isSmall : boolean}) {
    return (
        <Box bg="gray.200" p={isSmall ? 2 : 4} m={2}>
            <Text bold fontSize="xl">{badge.name} ({badge.points} points)</Text>
            <Text>{badge.description}</Text>
        </Box>
    )
}

BadgeComponent.defaultProps = {
    isSmall: false
}