import { Button, Flex, Link } from "@chakra-ui/react";
import { useAuth, useLogout } from "hooks/auth";
import { DASHBOARD, LOGIN, UPLOAD } from "lib/routes";
import { Link as RouterLink } from "react-router-dom";

export default function Navbar() {
    const {logout, isLoading} = useLogout();
    const {user, isLoading: authLoading } = useAuth();

    if (authLoading) return "Loading..."

    return (
    <Flex
        shadow="sm"
        pos="fixed"
        width="full"
        borderTop="6px solid"
        borderTopColor="teal.400"
        height="16"
        zIndex="3"
        justify="center"
        bg="white"
    >
        <Flex px="4" w="full" align="center" maxW="1200px">
            <Link color="teal" as={RouterLink} to={DASHBOARD} fontWeight = "bold" px="4">
                Home
            </Link>
            <Link color="teal" as={RouterLink} to={UPLOAD} fontWeight = "bold" px="4">
                Upload
            </Link>
            {user ? (
                <Button
                ml="auto"
                colorScheme="teal"
                size="sm"
                onClick={logout}
                isLoading={isLoading}
                >
                    Logout
                </Button>
            ) : (
                <Button
                ml="auto"
                colorScheme="teal"
                size="sm"
                as={RouterLink}
                to={LOGIN}
                >
                    Login
                </Button>
            )}
        </Flex>
    </Flex>
    );
}