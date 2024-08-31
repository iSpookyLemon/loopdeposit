import { Box, Button, Flex, FormControl, FormLabel, HStack, Heading, Input, Textarea } from "@chakra-ui/react";
import PostsLists from "components/post/PostsLists";
import { useAuth } from "hooks/auth";
import { useAddPost, usePosts } from "hooks/posts";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import Tagbar from "./Tagbar";

export default function Dashboard() {

    const [genres, setGenres] = useState([])

    const { filteredPosts, isLoading } = usePosts(undefined, genres);

    if (isLoading) return "Loading posts..."

    return (
        <Flex>
            <Tagbar setGenres={(genres) => setGenres(genres)}/>
            <PostsLists posts={filteredPosts}/>
        </Flex>
    );
}
