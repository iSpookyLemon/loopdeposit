import { Box, Checkbox, CheckboxGroup, Heading, Stack, Text } from "@chakra-ui/react";
import { TAGS } from "lib/tags";

export default function Tagbar({ setGenres }) {

    function handleChange(value) {
        setGenres(value)
    }


    return (
        <Box 
            pr="6"
            //height="full"
            w="30%"
            maxW="200px"
            borderRight="1px solid"
            borderRightColor="teal.100"
            position="sticky"
            pt="5"
            display={{ base: "none", md: "block" }}
            align="center"
        >
            <Heading size="md" align="left" pb="2">
                Filter by Genre
            </Heading>
            <CheckboxGroup colorScheme='green' onChange={handleChange}>
                <Stack spacing={[5, 2]} direction={['row', 'column']}>
                    {TAGS?.map(tag => <Checkbox value={tag} key={tag}>{tag}</Checkbox>)}
                </Stack>
            </CheckboxGroup>
        </Box>
    );
}