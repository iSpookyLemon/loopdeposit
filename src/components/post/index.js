import { Box, Center, Flex, FormControl, FormLabel, Stack, Text } from "@chakra-ui/react";
import Header from "./Header";
import Actions from "./Actions";
import Waveform from "utils/Waveform";

export default function Post({ post }) {

    const { text, loopURL, genres } = post;

    return (
        <Box p="2" maxW="600px" textAlign="left">
            <Box border="2px solid" borderColor="gray.100" borderRadius="md">

                <Header post={post}/>

                <Stack p="2" minH="100px">
                    <Text wordBreak="break-word" fontSize="md">
                        {text}
                    </Text>
                    <Text wordBreak="break-word" fontSize="sm" color="gray">
                        Genres: {genres.join(", ")}
                    </Text>
                    <Box h="80px">
                        <Waveform audio={loopURL} />
                    </Box>
                </Stack>

                <Actions post={post}/>

            </Box>
        </Box>
    );
}