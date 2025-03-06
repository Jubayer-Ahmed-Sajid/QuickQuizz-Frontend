import { createContext } from "react";

export const authContext = createContext();
const authProvider = ({children})=>{
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);
    const auth = getAuth(app)
    
    const createUser =(email,passwrod)=>{
        
    }

    const authInfo = {}
    return(
        <authContext.Provider value={authInfo}>
            {children}
        </authContext.Provider>
    )
}