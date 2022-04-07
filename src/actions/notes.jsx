import Swal from "sweetalert2"
import { db } from "../firebase/firebase-config"
import { fileUpload } from "../helpers/fileUpload"
import { loadNotes } from "../helpers/loadNotes"
import { types } from "../types/types"

export const startNewNote = () => {

    return async (dispatch, getState) => {
        const { uid } = getState().auth

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        const doc = await db.collection(`${uid}/journal/notes`).add(newNote)
        dispatch(activeNote(doc.id, newNote))
        dispatch(addNewNote(doc.id, newNote))
    }
}

export const addNewNote = (id, note) => ({
    type: types.notesAddNew,
    payload: { id, ...note }
})


export const activeNote = (id, note) => ({
    type: types.notesActive,
    payload: { id, ...note }
})

export const updateActiveNote = (id, note) => ({
    type: types.notesUpdated,
    payload: { id, ...note }
})

export const startLoadingNotes = (uid) => {
    return (dispatch) => {
        loadNotes(uid)
            .then(notes => dispatch(setNotes(notes)))
    }
}

export const setNotes = (notes) => ({
    type: types.notesLoad,
    payload: notes
})

export const startSaveNote = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth

        const { active: note } = getState().notes

        const noteToFirestore = { ...note }
        delete noteToFirestore.id

        if (!noteToFirestore.url) {
            delete noteToFirestore.url
        }

        await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFirestore)
        dispatch(refreshNote(note.id, note))

        Swal.fire('Saved', note.title, 'success')

    }
}

export const refreshNote = (id, note) => ({
    type: types.notesRefresh,
    payload: {
        id,
        note: { id, ...note }
    }
})

export const startUploadingImage = (file) => {
    return async (dispatch, getState) => {
        const { active: activeNote } = getState().notes

        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading()
            },
        })

        const fileUrl = await fileUpload(file)
        activeNote.url = fileUrl
        dispatch(startSaveNote(activeNote))

        Swal.close()

    }
}

export const startDeletingNote = (id) => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth
        await db.doc(`${uid}/journal/notes/${id}`).delete()

        dispatch(deleteNote(id))
    }
}

export const deleteNote = (id) => ({
    type: types.notesDelete,
    payload: id
})

export const logoutCleaningNotes = () => ({
    type: types.notesLogoutCleaning
})