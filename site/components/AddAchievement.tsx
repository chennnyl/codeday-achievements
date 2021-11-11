import Box from '@codeday/topo/Atom/Box'
import Button from '@codeday/topo/Atom/Button'
import {FormControl, FormLabel, FormHelperText} from '@chakra-ui/form-control'
import {Input} from '@chakra-ui/input'
import { NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from '@chakra-ui/number-input'
import React from 'react'

export default function AddAchievement() {
    const createAchievement = async (event: any) => {
        event.preventDefault()

        const jsonBody = {
            name: event.target.name.value,
            points: parseInt(event.target.points.value),
            description: event.target.description.value,
            category: event.target.category.value
        }

        const res = await fetch(
            "/api/badges",
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
            <form onSubmit={createAchievement}>
                <FormControl isRequired>
                    <FormLabel htmlFor="achievement-name">Achievement name</FormLabel>
                    <Input type="text" name="name" id="achievement-name" aria-describedby="name-helper-text" />
                    <FormHelperText id="name-helper-text">
                        Name it something funny!
                    </FormHelperText>
                </FormControl>
                <br/>
                <FormControl isRequired>
                    <FormLabel htmlFor="points">Achievement points</FormLabel>
                    <NumberInput id="points" defaultValue={10} min={0} max={30}>
                        <NumberInputField/>
                        <NumberInputStepper>
                            <NumberIncrementStepper/>
                            <NumberDecrementStepper/>
                        </NumberInputStepper>
                    </NumberInput>
                </FormControl>
                <br/>
                <FormControl isRequired>
                    <FormLabel htmlFor="description">Achievement description</FormLabel>
                    <Input type="text" id="description" aria-describedby="desc-helper-text" />
                    <FormHelperText id="desc-helper-text">
                        Keep it short and descriptive!
                    </FormHelperText>
                </FormControl>
                <br/>
                <FormControl isRequired>
                    <FormLabel htmlFor="category">Achievement category</FormLabel>
                    <Input type="text" id="category"/>
                </FormControl>
                <br/>
                <Button type="submit">Submit</Button>
            </form>
        </Box>
    )
}