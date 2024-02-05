import React from 'react'
import {AuthContext} from '../context/AuthContext'

const PrivateRoute = ({children}) => {
    const {user}= useContext(AuthContext);
  return (
    user ? children : <Navigate to="/" />
  )
}

export default PrivateRoute