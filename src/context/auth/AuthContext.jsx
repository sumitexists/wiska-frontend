import { createContext, useContext, useEffect, useState } from "react";


export const AuthContext = createContext({
    user:null , setUser : ()=>{}, isLoggedIn : false , setIsLoggedIn : ()=>{}, token :"", setToken :()=>{}})

export const AuthProvider = ({children, initialUser = null, initialToken = ""})=> {
    const [user, setUser] = useState(initialUser);
    const [isLoggedIn, setIsLoggedIn] = useState(Boolean(initialUser));
    const [token, setToken] = useState(initialToken);

    useEffect(() => {
        setUser(initialUser);
        setIsLoggedIn(Boolean(initialUser));
        setToken(initialToken);
    }, [initialUser, initialToken]);


    return(
        <AuthContext.Provider value={{user,setUser, isLoggedIn, setIsLoggedIn, token, setToken}}>
            {children}
        </AuthContext.Provider>
    )
}

export default function useUser() {
    return useContext(AuthContext)
}

