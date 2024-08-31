import { useToast } from "@chakra-ui/react";
import { uuidv4 } from "@firebase/util";
import { arrayRemove, arrayUnion, collection, deleteDoc, doc, getDocs, increment, orderBy, query, setDoc, updateDoc, where } from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "lib/firebase";
import { useRef, useState } from "react";
import { useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore'
import WaveSurfer from "wavesurfer.js";


export function useAddPost() {

    const [isLoading, setLoading] = useState(false);
    const [file, setFile] = useState(null);
    const toast = useToast();

    async function addPost(post) {
        if (!file) {
            toast({
                title: "No file selected",
                description: "Please select a file to upload",
                status: "error",
                isClosable: true,
                position: "top",
                duration: 5000,
            });
            return;
        }

        setLoading(true);

        const id = uuidv4();

        const fileRef = ref(storage, "loops/" + id);
        await uploadBytes(fileRef, file);

        const loopURL = await getDownloadURL(fileRef);

        await setDoc(doc(db, "posts", id), {
            ...post,
            id,
            date: Date.now(),
            likes: [],
            downloads: 0,
            loopURL,
        });

        toast({
            title: "Post added successfully!",
            status: "success",
            isClosable: true,
            position: "top",
            duration: 5000,
        });

        setFile(null);
        setLoading(false);
    }

    return {setFile, addPost, isLoading};
}

export function usePosts(uid = null, genres = null) {

    const q = uid ? query(collection(db, "posts"), orderBy('date', "desc"), where('uid', "==", uid)) : query(collection(db, "posts"), orderBy('date', "desc"));

    const [posts, isLoading, error] = useCollectionData(q);


    if (error) throw error;

    if (genres) {
        let filteredPosts = [];
        posts?.forEach((post) => {
            let isValid = true;
            console.log(post.genres)
            for (var i = 0; i < genres.length; i++) {
                console.log(genres[i])
                if (!post.genres.includes(genres[i])) {
                    isValid = false;
                }
            }
            if (isValid) {
                filteredPosts.push(post)
            }
        });
        console.log(filteredPosts)
        return { filteredPosts, isLoading }
    }

    return { posts, isLoading}
}

export function useLikes(posts) {

    let likes = 0;

    for (var i = 0; i < posts?.length; i++) {
        likes += posts[i].likes.length;
    }

    return { likes }
}

export function useToggleLike({id, isLiked, uid}) {

    const [isLoading, setLoading] = useState(false);

    async function toggleLike() {
        setLoading(true);
        const docRef = doc(db, "posts", id);
        await updateDoc(docRef, {likes: isLiked ? arrayRemove(uid) : arrayUnion(uid)});
        setLoading(false);
    }

    return {toggleLike, isLoading};
}

export function useDeletePost(id) {

    const [isLoading, setLoading] = useState(false);
    const toast = useToast();

    async function deletePost() {
        
        setLoading(true);

        await deleteDoc(doc(db, "posts", id))

        const q = query(collection(db, "comments"), where("postID", "==", id))
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (doc) => deleteDoc(doc.ref));

        const loopRef = ref(storage, 'loops/' + id);

        // Delete the file
        await deleteObject(loopRef)

        toast({
            title: "Post deleted!",
            status: "info",
            isClosable: true,
            position: "top",
            duration: 5000,
        });

        setLoading(false);

    }

    return {deletePost, isLoading};
}

export function usePost(id) {
    const q = doc(db, "posts", id);
    const [post, isLoading] = useDocumentData(q);

    return { post, isLoading };
}

export function useDownload(id) {

    const { post, isLoading } = usePost(id);

    async function downloadLoop() {
        const docRef = doc(db, "posts", id);
        console.log(post.loopURL)
        await updateDoc(docRef, {downloads: increment(1)});

        fetch(post.loopURL).then(response=>response.blob()).then(blob=> {
            const blobURL = window.URL.createObjectURL(new Blob([blob]))
            const aTag = document.createElement("a");
            aTag.href = blobURL;
            aTag.setAttribute("download", post.text + ".mp3");
            document.body.appendChild(aTag);
            aTag.click();
            aTag.remove();
        })
    }

    return { downloadLoop };
}

export function useWaveform(audio) {

    const [isPlaying, toggleIsPlaying] = useState(false);

    const containerRef = useRef();
    const waveSurferRef = useRef();

    const waveSurfer = WaveSurfer.create({
        container: containerRef.current,
        responsive: true,
        cursorWidth: 0,
        progressColor: "teal",
    })
    console.log(waveSurfer);
    waveSurfer.load(audio);
    waveSurfer.on('ready', () => {
        waveSurferRef.current = waveSurfer
    })
    waveSurfer.on('finish', () => {
        toggleIsPlaying(!isPlaying)
    })
    console.log(containerRef);

    return { containerRef, waveSurferRef, isPlaying, toggleIsPlaying};
}