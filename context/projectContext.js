import React, { createContext, useState } from 'react'



//creating context for edit: data updation without refresh

const addProjectContext = createContext();

const projectContext = ({children}) => {   //children or app passed as children object destructuring
    const [addProjectResponse, setAddProjectResponse] = useState([]);

  return (
  <addProjectContext.Provider
  value={{addProjectResponse,setAddProjectResponse}}>

       {children}

  </addProjectContext.Provider>
  )
}

export default projectContext