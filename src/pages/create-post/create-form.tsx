import {useForm} from "react-hook-form"
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup"
import { addDoc, collection } from "firebase/firestore";
import {db, auth} from "../../config/firebase"
import {useAuthState} from "react-firebase-hooks/auth"
import { useNavigate } from "react-router-dom";

interface createFormData {
    title: string;
    body: string;
}


export const CreateForm = () => {
    const [user] = useAuthState(auth)
    const navigate = useNavigate()
    const schema = yup.object().shape({
        title: yup.string().required("You must add a title!"),
        body: yup.string().required("You must enter a post body!"),
    })

    const {register, handleSubmit, formState: {errors}} = useForm<createFormData>({
        resolver: yupResolver(schema)
    })

    const postsRef = collection(db, "posts")


    const onCreatePost = async (data: createFormData ) => {
        await addDoc(postsRef, {
            /* title: data.title,
            body: data.body, */
            ...data,
            username: user?.displayName,
            userId: user?.uid
        })
        navigate("/")
    }

    return (
        <form className="submit-data" onSubmit={handleSubmit(onCreatePost)}>
            <input placeholder="Title..." {...register("title")}/>
            <p style = {{color: "#772431"}}>{errors.title?.message}</p>
            <textarea placeholder="Body..." {...register("body")} />
            <p style = {{color: "#772431"}}>{errors.body?.message}</p>
            <input className="submit-button" type = "submit" />
        </form>
    )
}