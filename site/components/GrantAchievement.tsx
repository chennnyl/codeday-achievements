import Box from '@codeday/topo/Atom/Box'
import Button from '@codeday/topo/Atom/Button'
import {FormControl, FormLabel, FormHelperText} from '@chakra-ui/form-control'
import {Select} from '@chakra-ui/select'

export default function() {
    return (
        <Box p={4} border="1px" borderColor="gray.400" w={3/4}>
            <form>
                <FormControl isRequired>
                    <FormLabel htmlFor="grant-name">Attendee to grant</FormLabel>
                    <Select id="grant-name" name="name" placeholder="Select a user">
                        <option value="dummy">User 1</option>
                    </Select>
                </FormControl>
                <br/>
                <FormControl isRequired>
                    <FormLabel htmlFor="grant-badge">Badge to grant</FormLabel>
                    <Select id="grant-badge" name="badge" placeholder="Select a user">
                        <option value="dummy">Badge 1</option>
                    </Select>
                </FormControl>
                <br/>
                <Button type="submit">Submit</Button>
            </form>
        </Box>
    )
}