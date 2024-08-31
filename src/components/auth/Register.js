import { Box, Button, Center, FormControl, FormErrorMessage, FormLabel, Heading, Image, Input, Link, Text, VStack } from "@chakra-ui/react";
import { DASHBOARD, LOGIN } from "lib/routes";
import { Link as RouterLink } from "react-router-dom";
import { useRegister } from "hooks/auth";
import { useForm } from "react-hook-form";
import { emailValidate, passwordValidate, usernameValidate } from "utils/form-validate.js"
import loopdepositlogo from "assets/loopdepositlogo.jpg"

export default function Register() {

    const {register : signup, isLoading} = useRegister();

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    async function handleRegister(data) {
        const succeeded = await signup({username: data.username, email: data.email, password: data.password, redirectTo: DASHBOARD});

        if (succeeded) {
            reset();
        }
    }

    return (
    <Center w="100%" h = "100vh">
        <VStack>
            <Box w="300px">
                <Image src={loopdepositlogo} fallbackSrc='https://via.placeholder.com/150'></Image>
            </Box>
            <Box mx="1" maxW="md" p="9" borderWidth="1px" borderRadius="lg">
                <Heading mb="4" size="lg" textAlign="center">
                    Register
                </Heading>

                <form onSubmit={handleSubmit(handleRegister)}>
                    <FormControl isInvalid={errors.username} py="2">
                        <FormLabel>Username</FormLabel>
                        <Input placeholder="Username" {...register('username', usernameValidate)}/>
                        <FormErrorMessage>{errors.username && errors.username.message}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={errors.email} py="2">
                        <FormLabel>Email</FormLabel>
                        <Input type="email" placeholder="Email" {...register('email', emailValidate)}/>
                        <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={errors.password} py="2">
                        <FormLabel>Password</FormLabel>
                        <Input type="password" placeholder="Password" {...register("password", passwordValidate)}/>
                        <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
                    </FormControl>
                    <Button mt="4" type="submit" colorScheme="teal" size="md" w="full" isLoading={isLoading} loadingText="Signing Up">
                        Register
                    </Button>
                </form>
                <Text fontSize="xlg" align="center" mt="6">
                    Already have an account?{" "}
                    <Link as={RouterLink} to={LOGIN} color="teal.800" fontWeight="medium" textDecor="underline" _hover={{ background: "teal.100" }}>
                        Login
                    </Link> {" "}
                    instead!
                </Text>
            </Box>
        </VStack>
    </Center>
    );
}
