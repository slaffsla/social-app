import { auth, provider} from "../config/firebase"
import { signInWithPopup } from "firebase/auth"
import { useNavigate } from "react-router-dom"

export const Login = () => {
    const navigate = useNavigate()

    const signInWithGoogle = async () => {
        const result = await signInWithPopup(auth, provider)
        navigate("/")
    }
    return <div>
        <p className="signin">Sign In with Google to Continue</p>
        <button className="login-button" onClick={signInWithGoogle}>Sign in With Google</button>
        </div>
}