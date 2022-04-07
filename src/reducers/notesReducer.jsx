import { types } from "../types/types";

const initialState = {
    notes: [],
    active: null
}

export const notesReducer = (state = initialState, action) => {
    switch (action.type) {

        case types.notesAddNew:
            return {
                ...state,
                notes: [...state.notes, action.payload ]
            }

        case types.notesActive:
            return {
                ...state,
                active: { ...action.payload }
            }

        case types.notesLoad:
            return {
                ...state,
                notes: [...action.payload]
            }

        case types.notesUpdated:
            return {
                ...state,
                active: action.payload
            }

        case types.notesRefresh:
            return {
                ...state,
                notes: state.notes.map(note => {
                    return note.id === action.payload.id
                        ? action.payload.note
                        : note
                })
            }

        case types.notesDelete:
            return {
                ...state,
                notes: state.notes.filter(note =>
                    note.id !== action.payload),
                active: null
            }

        case types.notesLogoutCleaning:
            return {
                ...initialState
            }

        default:
            return state;
    }
}