import {
    types
} from "../types/types"
import {
    firebase,
    googleAuthProvider
} from "../firebase/firebase-config";
import {
    finishLoading,
    startLoading
} from "./ui";
import Swal from "sweetalert2";
import { logoutCleaningNotes } from "./notes";




export const startLoginEmailPassword = (email, password) => {
    /* Esta acción devuelve un callback que va a saber entender el middleware.
    En este caso tenemos una Promesa, que por lo tanto es un proceso asíncrono,
    si no tuvieramos el middleware configurado, nos daría error. 
    La idea será realizar una petición HTTP para verificar el login con el
    email y la password, para posteriormente ejecutar la acción login, la cual
    creará un state global en el store de que estamos logeados. */
    return (dispatch) => {
        dispatch(startLoading())
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(({
                user
            }) => {
                dispatch(finishLoading())
                dispatch(login(user.uid, user.displayName))
            })
            .catch(error => {
                dispatch(finishLoading())
                Swal.fire('Error', error.message, 'error')
            })
    }
}


export const startRegister = (name, email, password) => {
    return (dispatch) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async ({
                user
            }) => {
                await user.updateProfile({
                    displayName: name
                })

                dispatch(
                    login(user.uid, user.displayName)
                )
            })
            .catch(error => {
                Swal.fire('Error', error.message, 'error')
            })
    }
}



export const startGoogleLogin = () => {
    return (dispatch) => {
        firebase.auth().signInWithPopup(googleAuthProvider)
            .then(({
                user
            }) => {
                dispatch(login(user.uid, user.displayName))
            })
            .catch(error => {
                Swal.fire('Error', error.message, 'error')
            })
    }
}


// Recordamos que las acciones siempre tienen el type y el payload
export const login = (uid, displayName) => ({

    /* Queremos disparar una función asíncrona .Para ello hemos definido un
    middleware, ya que por defecto, nuestras acción que se disparan en los
    reducers tienen que ser síncronas. */
    type: types.login,
    payload: {
        uid,
        displayName
    }
})

export const startLogout = () => {
    return async (dispatch) => {
        await firebase.auth().signOut()

        dispatch(logoutCleaningNotes())
        dispatch(logout())
    }
}

export const logout = () => ({
    type: types.logout
})