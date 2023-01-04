import { Link } from "react-router-dom"
import { auth } from "../config/firebase"
import {useAuthState} from "react-firebase-hooks/auth"
import {signOut} from "firebase/auth"
export const Navbar = () => {
    const [user] = useAuthState(auth)
    const logOut = async () => {
        await signOut(auth)
    }

    return (
    <div className="navbar">
        <div className="links">
        <Link to = "/">Home</Link>
        {user ? <Link to = "/createpost">Create Post</Link> :
        <Link to = "/login">Login</Link>}
        </div>
        <div className="user">
            {user && (
                <>
                    <p>User: {user?.displayName}</p>
                    <img src = {auth.currentUser?.photoURL || ""} width = "50" height="50" className="img" alt = "Avatar"/>
                    <button className="logout-button" onClick={logOut}>Log Out</button>
                </>
            )}
        </div>
    </div>
    )
}