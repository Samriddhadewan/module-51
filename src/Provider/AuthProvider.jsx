import { createContext, useEffect, useState } from "react"
import auth from "../farebase.init";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);
// eslint-disable-next-line react/prop-types
const AuthProvider = ({children}) => {  
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)


    // sign in here 
    const signinUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password);
    }
    // create account here 
    const createUser = (email,password)=> {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signOutUser = () => {
        setLoading(true)
        return signOut(auth);
    }




    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth,(currentUser)=> {
            if(currentUser){
                console.log(currentUser);
                setUser(currentUser);
                setLoading(false)

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
        user,
        loading,
       createUser,
       signinUser,
       signOutUser,
    }
    return (
    <AuthContext.Provider value={authInfo}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider