import { createContext, useEffect, useState } from "react"
import auth from "../farebase.init";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";

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

    const signOutUser = () => {
       return signOut(auth);
    }




    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth,(currentUser)=> {
            if(currentUser){
                console.log(currentUser);
                setUser(currentUser)

            }
            else{
                console.log("no current user")
                setUser(null)
            }
        })
        return () => {
            unSubscribe();
        }


    } ,[])




    const authInfo = {
       name,
       createUser,
       signinUser,
       signOut,
       user
    }
    return (
    <AuthContext.Provider value={authInfo}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider