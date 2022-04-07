import {
    types
} from "../types/types";


const initialState = {}

/* Tendremos un state -> auth en mi store que se verá modificado por las actions.
Los tipos de actions que tendremos los definiremos en los types. Más luego, tendremos
un fichero con las actions correspondientes a su tipo (nombre de la action). En
Este fichero, cuando definimos una action, simplemente generamos un objeto con el
tipo y el payload, que es información/data para cambiar el initialState.
Para ejecutar estas actions que afectas a los states, tenemos los dispatcher que
a través de los hooks de Redux podemos disparar en cualquier componente. En este
caso usaría useDispatcher para obtener un dispatcher, y los otro lado usaríamos
useSelector que nos devuelve el state del store. Que en los chrometools de redux
podemos ver en el chart que en el state podemos encontrar los states que definen
los reducer. En este caso, el state que define este reducer es -> auth */

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.login:
            return {
                uid: action.payload.uid,
                name: action.payload.displayName
            }

        case types.logout:
            return {}

        default:
            return state;
    }
}