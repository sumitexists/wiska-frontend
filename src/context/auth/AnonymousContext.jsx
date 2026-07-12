import {createContext,useContext, useState, useEffect} from "react";


const AnonymousContext = createContext({anonymousUser:null , setAnonymousUser : ()=>{}, isLoggedIn : false , setIsLoggedIn : ()=>{}});

export const AnonymousProvider = ({ children, initialAnonymousUser = null }) =>{
    const [anonymousUser, setAnonymousUser] = useState(initialAnonymousUser);
    const [isLoggedIn, setIsLoggedIn] = useState(Boolean(initialAnonymousUser));

    useEffect(() => {
        setAnonymousUser(initialAnonymousUser);
        setIsLoggedIn(Boolean(initialAnonymousUser));
    }, [initialAnonymousUser]);
    return(
        <AnonymousContext.Provider value={{anonymousUser, setAnonymousUser, isLoggedIn, setIsLoggedIn}}>
            {children}
        </AnonymousContext.Provider>
    )
}

export default function useAnonymousUser() {
    return useContext(AnonymousContext);
}