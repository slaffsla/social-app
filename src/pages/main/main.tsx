import { getDocs, collection } from "firebase/firestore"
import { db } from "../../config/firebase"
import { useState, useEffect } from "react"
import { Post } from "./post";

export interface PostInt {
    id: string;
    userId: string;
    title: string;
    username: string;
    body: string;
}

export const Main = () => {
    const [postList, setPostList] = useState<PostInt[] | null>(null)
    const postsRef = collection(db, "posts")

    const getPosts = async () => {
        const data = await getDocs(postsRef)
        setPostList(data.docs.map((doc) => ({...doc.data(), id: doc.id})) as PostInt[])
    }

    useEffect(() => {
        setTimeout(function(){
            getPosts()
            console.log("usEff")}, 200 )
    }, [])
    return (
        <div className="text">
        {postList?.map((post) => <Post post ={post} /> )}
        </div>
        )
}