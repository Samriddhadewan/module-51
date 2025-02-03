import { createContext, useState } from "react"
import auth from "../farebase.init";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);
// eslint-disable-next-line react/prop-types
const AuthProvider = ({children}) => {  
    const [user, setUser] = useState(null)
    const name = "i wanna fuck";


    // sign in here 
    const signinUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }
    // create account here 
    const createUser = (email,password)=> {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    onAuthStateChanged(auth, (currentUser) => {
        if(currentUser){
            console.log( 'currently logged user' ,currentUser)
            setUser(currentUser)
        }
        else{
            console.log("no user logged in")
            setUser(null)
        }
    })



    const authInfo = {
       name,
       createUser,
       signinUser,
       user
    }
    return (
    <AuthContext.Provider value={authInfo}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider