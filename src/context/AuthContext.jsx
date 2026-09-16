import React, { createContext, useState } from 'react'


export const AuthContext = createContext()
export function AuthProvider({children}) {
    const USER_KEY='current_user'
    const [user,setUser]=useState(()=>{
        const stored=localStorage.getItem(USER_KEY)
        return stored?JSON.parse(stored):null
    })
    function loginUser(userData){
            setUser(userData)
            localStorage.setItem(USER_KEY,JSON.stringify(userData))
    }
    function logOutUser(){
        setUser(null)
        localStorage.removeItem(USER_KEY)
    }


  return (
   <AuthContext.Provider value={{user,loginUser,logOutUser}}>
   {children}
   </AuthContext.Provider>
  )
}

