import React from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRoutes = ({ children, isLoggedIn }) => {

    return isLoggedIn
        ? children
        : <Navigate to={'/auth/login'} />
}

export default PrivateRoutes