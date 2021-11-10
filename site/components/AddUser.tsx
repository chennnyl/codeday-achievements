import Box from '@codeday/topo/Atom/Box'
import Button from '@codeday/topo/Atom/Button'
import {FormControl, FormLabel, FormHelperText} from '@chakra-ui/form-control'
import {Input} from '@chakra-ui/input'

export default function() {
    const createUser = async (event: any) => {
        event.preventDefault()

        const jsonBody = {
            name: event.target.name.value,
            email: event.target.email.value
        }        

        const res = await fetch(
            "http://localhost:3001/users",
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
            <form onSubmit={createUser}>
                <FormControl isRequired>
                    <FormLabel htmlFor="user-name">Attendee name</FormLabel>
                    <Input type="text" id="user-name" name="name"/>
                </FormControl>
                <br/>
                <FormControl isRequired>
                    <FormLabel htmlFor="email">Attendee email for CodeDay account</FormLabel>
                    <Input type="email" name="email" id="email" aria-describedby="email-helper-text" />
                    <FormHelperText id="desc-helper-text">
                        Currently has no functionality, might be used later
                    </FormHelperText>
                </FormControl>
                <br/>
                <Button type="submit">Submit</Button>
            </form>
        </Box>
    )
}