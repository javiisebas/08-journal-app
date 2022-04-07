import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { JournalScreen } from '../components/journal/JournalScreen'
import AuthRouter from './AuthRouter'
import { firebase } from "../firebase/firebase-config";
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import { LoadingScreen } from '../components/auth/LoadingScreen';
import PublicRoutes from './PublicRoutes';
import PrivateRoutes from './PrivateRouter';
import { startLoadingNotes } from '../actions/notes';

const AppRouter = () => {

    const dispatch = useDispatch()

    const [checking, setChecking] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user?.uid) {
                dispatch(login(user.uid, user.displayName))
                setIsLoggedIn(true)

                dispatch(startLoadingNotes(user.uid))

            } else {
                setIsLoggedIn(false)
            }

            setChecking(false)
        })
    }, [dispatch]);

    if (checking) {
        return (
            <LoadingScreen />
        )
    }


    return (
        <BrowserRouter>
            <Routes>

                <Route path='/auth/*' element={
                    <PublicRoutes isLoggedIn={isLoggedIn}>
                        <AuthRouter />
                    </PublicRoutes>
                } />
                <Route path='/*' element={
                    <PrivateRoutes isLoggedIn={isLoggedIn}>
                        <JournalScreen />
                    </PrivateRoutes>
                } />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter
