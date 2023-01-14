import { getDocs, collection, Timestamp } from "firebase/firestore"
import { db } from "../../config/firebase"
import { useState, useEffect } from "react"
import { Post } from "./post";

export interface PostInt {
    id: string;
    userId: string;
    title: string;
    username: string;
    body: string;
    createdAt: Timestamp
}

export const Main = () => {
    const [postList, setPostList] = useState<PostInt[] | null>(null)
    const postsRef = collection(db, "posts")
    
     const getPosts = async () => {
        const data = await getDocs(postsRef)
        console.log("data: ", data)
        const unsortedPosts = data.docs.map((doc) => ({...doc.data(), id: doc.id })) as PostInt[]
        setPostList(unsortedPosts.sort((a:PostInt,b:PostInt) => {
            if (a.createdAt > b.createdAt) {
              return 1;
            }
            if (a.createdAt < b.createdAt) {
              return -1;
            }
            return 0;
          }
        ))
    }

    useEffect(() => {
        setTimeout(function(){
            getPosts()
            }, 2 )
    }, []) 
    return (
        <div className="text">
        {postList?.map((post) => <Post post ={post} /> )}
        </div>
        )
    }