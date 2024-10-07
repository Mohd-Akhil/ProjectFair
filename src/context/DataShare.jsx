import React, { createContext, useState } from 'react'

export const addResponseContext = createContext({})
export const editResponseContext = createContext({})

function DataShare({ children }) {

  const [addResponse, setAddResponse] = useState({})
  const [editResponse, setEditResponse] = useState({})

  return (

    //access the value of the context
    <addResponseContext.Provider value={{ addResponse, setAddResponse }}>
      <editResponseContext.Provider value={{ editResponse, setEditResponse }}>
        {children}
      </editResponseContext.Provider>
    </addResponseContext.Provider>

  )
}

export default DataShare