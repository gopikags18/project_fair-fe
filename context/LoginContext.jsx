import React, { createContext, useEffect, useState } from 'react'


export const loginContext = createContext();

//for route guarding
const LoginContext = ({children}) => {
const [isloggedIn, setLoggedIn] = useState(false);

 useEffect(()=>{
if(sessionStorage.getItem('token'))
{
   setLoggedIn(true);

}
else{
    setLoggedIn(false)
}
    },[isloggedIn])
  return (
   <loginContext.Provider value={{isloggedIn, setLoggedIn}}>
    {children}
   </loginContext.Provider>


  )
}

export default LoginContext