import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { LoginScreen } from '../components/auth/LoginScreen'
import { RegisterScreen } from '../components/auth/RegisterScreen'

const AuthRouter = () => {
    return (
        <div className="auth-main">
            <div className="auth-container">
                <Routes>
                    <Route path='login' element={<LoginScreen />} />
                    <Route path='register' element={<RegisterScreen />} />
                    <Route path='/*' element={<LoginScreen />} />
                </Routes>
            </div>
        </div>
    )
}

export default AuthRouter
