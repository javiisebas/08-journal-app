import React from 'react'
import { Navigate } from 'react-router-dom'

const PublicRoutes = ({ children, isLoggedIn }) => {

    return !isLoggedIn
        ? children
        : <Navigate to={'/'} />
}

export default PublicRoutes