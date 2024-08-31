import { Box, Button, FormControl, FormErrorMessage, FormLabel, HStack, Heading, Input, Text, Textarea } from "@chakra-ui/react";
import { Select, components } from "chakra-react-select";
import { useAuth } from "hooks/auth";
import { useAddPost } from "hooks/posts";
import { TAGS } from "lib/tags";
import { useEffect, useState } from "react";
import { useController, useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";

function NewPost() {

    const {control, register, handleSubmit, reset, setValue} = useForm();
    const {setFile, addPost, isLoading: addingPost} = useAddPost();
    const {user, isLoading: authLoading} = useAuth();
    const [fileName, setFileName] = useState("");

    let genres = [];

    for (var i = 0; i < TAGS.length; i++) {
        genres.push({
            label: TAGS[i],
            value: TAGS[i]
        })
    }

    const ControlledSelect = ({ control, name, label, rules, ...props }) => {
        const {
          field: { onChange, onBlur, value, ref },
          fieldState: { error }
        } = useController({
          name,
          control,
          rules
        });

        const menu = props => {
            const optionselectedlength = props.getValue().length || 0;
            return (
              <components.Menu {...props}>
                {optionselectedlength < 3 ? (
                  props.children
                ) : (
                  <Text p="2">Maximum Number Selected</Text>
                )}
              </components.Menu>
            );
          };    
        
        const isvalidnewoption = (inputvalue, selectvalue) => inputvalue.length > 0 && selectvalue.length < 5;  
      
        return (
          <FormControl py={4}  onKeyDown={e => {if (e.key === 'Enter') e.preventDefault();}}>
            <FormLabel>{label}</FormLabel>
      
            <Select
              isMulti
              name={name}
              ref={ref}
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              components={{Menu: menu}}
              isvalidnewoption={isvalidnewoption}
              {...props}
            />
      
            <FormErrorMessage>{error && error.message}</FormErrorMessage>
          </FormControl>
        );
    };
    
    async function handleAddPost(data) {
        if (data.text !== "" && data.genre !== "") {
            await addPost({
                uid: user.id,
                text: data.text,
                genres: data.genre.map(x => x.value)
            })
            setFileName("");
            reset();
        }
    }

    function handleChange(e) {
        setFile(e.target.files[0])
        setFileName(e.target.files[0]?.name.slice(0, -4))
    }

    useEffect(() => {
        setValue('text', fileName)
    }, [fileName])

    return (
        <Box p="4" maxW="600px" mx="auto" my="10" textAlign="left" border="2px solid" borderColor="teal.400" borderRadius="md" bg="gray.50">
            <form onSubmit={handleSubmit(handleAddPost)}>
                <HStack justify="space-between">
                    <Heading size="lg">New Loop</Heading>
                    <Button colorScheme="teal" type="submit" isLoading={authLoading || addingPost} loadingText="Loading">Post</Button>
                </HStack>

                <FormControl py="4">
                    <FormLabel htmlFor="loop">Upload loop</FormLabel>
                    <Input type="file" accept="audio/*" onChange={handleChange} size="s" border="none"/>
                </FormControl>

                <Textarea 
                    as={TextareaAutosize}
                    resize="none"
                    mt="5"
                    placeholder="Describe your loop..."
                    minRows={3}
                    borderColor="gray.600"
                    //value={fileName}
                    {...register("text")}
                />

                <ControlledSelect
                    control={control}
                    isMulti
                    name="genre"
                    options={genres}
                    placeholder="Trap"
                    label="Genre (Select up to 3)"
                    rules={{ required: "Please enter at least one genre." }}
                />
            </form>
        </Box>
    );
}

export default function Upload() {
    return (
        <NewPost />
    );
}