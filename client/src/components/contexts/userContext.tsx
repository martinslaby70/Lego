import React, {createContext, useState} from 'react'

//interfaces
import {user} from '../../interfaces';

interface userContextType {
    user: user | null,
    logOut: () => void,
    logIn: (user: user) => void,
}

export const UserContext = createContext<userContextType | null>(null);

interface props {
    children: React.ReactNode
}
export const UserContextProvider = ({children}: props) => {

    const [user, setUser] = useState<user | null>(null);
    
    const logOut = () => setUser(null);
    const logIn = (user: user) => setUser(user);

    return(
        <UserContext.Provider value={{user, logIn, logOut}}>
            {children}
        </UserContext.Provider>
    )
}
