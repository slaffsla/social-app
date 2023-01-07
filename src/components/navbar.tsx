import { Link } from "react-router-dom"
import { auth } from "../config/firebase"
import {useAuthState} from "react-firebase-hooks/auth"
import {signOut} from "firebase/auth"
import logo from "./Logo-social.96c.svg"
export const Navbar = () => {
    const [user] = useAuthState(auth)
    const logOut = async () => {
        await signOut(auth)
    }

    return (
        <div className="navbar-all">
            <Link to = "/">
                <img src = {logo} width = "96" height="96" className="logo" alt = "Avatar"/>
            </Link>
            <div className="navbar">
                <div className="links">
                <Link to = "/">Home</Link>
                {user ? <Link to = "/createpost">Create Post</Link> :
                <>
                <Link to = "/login">Login</Link><p>Must log in to see content!</p></>}
                </div>
                <div className="user">
                    {user && (
                        <>
                            <img src = {auth.currentUser?.photoURL || ""} width = "50" height="50" className="img" alt = "Avatar"/>
                            <div className="user-info">
                                <p>User: {user?.displayName}</p>
                                <button className="logout-button" onClick={logOut}>Log Out</button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}