import { createContext } from "react"
import auth from "../farebase.init";
import { createUserWithEmailAndPassword } from "firebase/auth";

export const AuthContext = createContext(null);
const AuthProvider = ({children}) => {  

    const name = "i wanna fuck";
    const createUser = (email,password)=> {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const authInfo = {
       name,
       createUser
    }
    return (
    <AuthContext.Provider value={authInfo}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider