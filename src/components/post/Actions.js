import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Flex, IconButton, useDisclosure, Button } from "@chakra-ui/react";
import { useAuth } from "hooks/auth";
import { useComments } from "hooks/comments";
import { useToggleLike, useDeletePost, useDownload } from "hooks/posts";
import { useUser } from "hooks/users";
import { PROTECTED } from "lib/routes";
import { useRef } from "react";
import {FaRegHeart, FaHeart, FaComment, FaRegComment, FaTrash, FaDownload} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Actions({post}) {

    const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure()
    const cancelDeleteRef = useRef()

    const { isOpen: isDownloadOpen, onOpen: onDownloadOpen, onClose: onDownloadClose } = useDisclosure()
    const cancelDownloadRef = useRef()

    const { id, likes, uid, downloads } = post;
    const { user, isLoading: userLoading } = useAuth();
    const isLiked = likes.includes(user?.id);
    const { toggleLike, isLoading: likeLoading } = useToggleLike({id, isLiked, uid: user?.id});
    const {deletePost, isLoading: deleteLoading} = useDeletePost(id);
    const {comments, isLoading: commentLoading} = useComments(id);
    const { downloadLoop } = useDownload(id);

    const { user: postUser, isLoading: postUserLoading } = useUser(uid)

    return <Flex p="2">
    
        <Flex alignItems="center">
            <IconButton 
                onClick={onDownloadOpen}
                isLoading={userLoading}
                size="md" 
                colorScheme="black" 
                variant="ghost" 
                icon={<FaDownload />} 
                isRound/>
            {downloads}
        </Flex>

        {!postUserLoading && (
        <AlertDialog
        motionPreset='slideInBottom'
        leastDestructiveRef={cancelDownloadRef}
        onClose={onDownloadClose}
        isOpen={isDownloadOpen}
        isCentered
        >
            <AlertDialogOverlay />

            <AlertDialogContent>
                <AlertDialogHeader>Download Loop</AlertDialogHeader>
                <AlertDialogCloseButton />
                <AlertDialogBody>
                    Please contact @{postUser.username} to confirm the terms and conditions of this loop.
                    <br></br>
                    Email: {postUser.email}
                </AlertDialogBody>
                <AlertDialogFooter>
                    <Button ref={cancelDownloadRef} onClick={onDownloadClose}>
                    No
                    </Button>
                    <Button colorScheme='teal' ml={3} onClick={() => {downloadLoop(); onDownloadClose()}}>
                    Yes
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
        )}

        <Flex alignItems="center">
            <IconButton 
                onClick={toggleLike}
                isLoading={likeLoading || userLoading}
                size="md" 
                colorScheme="red" 
                variant="ghost" 
                icon={isLiked ? <FaHeart /> : <FaRegHeart />} 
                isRound/>
            {likes.length}
        </Flex>

        <Flex alignItems="center" ml="2">
            <IconButton
                as={Link}
                to={`${PROTECTED}/comments/${id}`}
                //isLoading={likeLoading || userLoading}
                size="md" 
                colorScheme="teal" 
                variant="ghost" 
                icon={comments?.length === 0 ? <FaRegComment /> : <FaComment />} 
                isRound
            />
            {comments?.length}
        </Flex>

        {!userLoading && (user.id === uid) && (
            <IconButton
                ml="auto"
                onClick={onDeleteOpen}
                isLoading={deleteLoading}
                size="md" 
                colorScheme="red" 
                variant="ghost" 
                icon={<FaTrash />} 
                isRound
            />
        )}

        <AlertDialog
        motionPreset='slideInBottom'
        leastDestructiveRef={cancelDeleteRef}
        onClose={onDeleteClose}
        isOpen={isDeleteOpen}
        isCentered
        >
        <AlertDialogOverlay />

        <AlertDialogContent>
            <AlertDialogHeader>Delete Loop?</AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>
                Are you sure you want to discard this loop?
            </AlertDialogBody>
            <AlertDialogFooter>
                <Button ref={cancelDeleteRef} onClick={onDeleteClose}>
                No
                </Button>
                <Button colorScheme='red' ml={3} onClick={deletePost}>
                Yes
                </Button>
            </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </Flex>;
}