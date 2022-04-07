import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { authReducer } from "../reducers/authReducer";
import { notesReducer } from "../reducers/notesReducer";
import { uiReducer } from "../reducers/uiReducer";


const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;


/* createStore solo puede aceptar una variable reducer, es por eso que precisamos
unir todos nuestros reducers (funciones con acciones) para poder luego pasárselo
al Store. Usamos la función propia combinaReducers */
const reducers = combineReducers({
    auth: authReducer,
    ui: uiReducer,
    notes: notesReducer,
})

/* createStore es una función de Redux que crea el store. Este puede tomar como
parámetros de entrada los reducers(funciones que disparan acciones y generan
estados), junto con los middlewares para poder realizar acciones asíncronas */
export const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware(thunk)
        // Aplicamos el middleware THUNK -> Dispara acciones asíncronas
    ))