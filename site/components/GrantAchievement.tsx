import * as React from 'react'
import Box from '@codeday/topo/Atom/Box'
import Button from '@codeday/topo/Atom/Button'
import {FormControl, FormLabel, FormHelperText} from '@chakra-ui/form-control'
import {Select} from '@chakra-ui/select'
import User from '../interfaces/user'

export default function GrantAchievement({ users, badgeNameList } : { users: User[], badgeNameList: string[]}) {

    const [userSelect, setUserSelect] = React.useState("")

    const onUserChange = (event: any) => {
        setUserSelect(event.target.value)
    }

    let badgeOptions: JSX.Element[] | null = null;
    let badgesUserDoesntHave: string[] | null = null;

    if(userSelect != null) {
        let hadBadges = users.filter(user => user.name == userSelect)[0]?.badges;
        badgesUserDoesntHave = badgeNameList.filter(name => !hadBadges?.includes(name));
    }
    if(badgesUserDoesntHave) {
        badgeOptions = badgesUserDoesntHave.map((badge : string) => (
            <option key={badge} value={badge}>{badge}</option>
        ))
    }

    const grantBadge = async (event: any) => {
        event.preventDefault()

        const jsonBody = {
            user: event.target.name.value,
            badge: event.target.badge.value
        }

        const res = await fetch(
            "/api/badges/add",
            {
                body: JSON.stringify(jsonBody),
                headers: {
                    "Content-Type": "application/json"
                },
                method: "POST"
            }
        )
        const result = await res.json()
        alert(result.status)
    }

    return (
        <Box p={4} border="1px" borderColor="gray.400" w={3/4}>
            <form onSubmit={grantBadge}>
                <FormControl isRequired>
                    <FormLabel htmlFor="grant-name">Attendee to grant</FormLabel>
                    <Select id="grant-name" name="name" placeholder="Select a user" onChange={onUserChange}>
                        {users.map(user=>(
                            <option key={user.name} value={user.name}>{user.name}</option>
                        ))}
                    </Select>
                </FormControl>
                <br/>
                <FormControl isRequired>
                    <FormLabel htmlFor="grant-badge">Badge to grant</FormLabel>
                    <Select id="grant-badge" name="badge" placeholder="Choose a badge...">
                        {badgeOptions}
                    </Select>
                </FormControl>
                <br/>
                <Button type="submit"  bg="success.bg" textColor="white">Submit</Button>
            </form>
        </Box>
    )
}