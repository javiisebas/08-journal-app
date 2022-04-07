import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startDeletingNote, updateActiveNote } from '../../actions/notes'
import { useForm } from '../../hooks/useForm'
import NotesAppBar from './NotesAppBar'

const NoteScreen = () => {

    const dispatch = useDispatch()

    const { active: note } = useSelector(state => state.notes)
    const { url } = note

    const [formValues, handleInputChange, handleResetForm] = useForm(note)
    const { title, body } = formValues

    const isActive = useRef(note.id)

    useEffect(() => {
        if (note.id !== isActive.current) {
            handleResetForm(note)
            isActive.current = note.id
        }
    }, [note, handleResetForm]);

    useEffect(() => {
        dispatch(updateActiveNote(formValues.id, { ...formValues }))
    }, [formValues, dispatch])

    /* 
    Si pusiera:
    
    useEffect(() => {
        handleResetForm(note)
    }, [note, handleResetForm]);

    En cada handleInputChange, estaríamos cambiando el estado, por lo que saltaría
    el useEffect y por lo tanto estaríamos reseteando el formValue todo el rato al
    valor inicial del note. Con lo cual, nunca seríamos capaces de escribir.
    */

    const handleDelete = () => {
        dispatch(startDeletingNote(note.id))
    }

    return (
        <div className='notes-main-content'>

            <NotesAppBar />

            <div className="notes-content">
                <input type="text"
                    placeholder='Some awesome title'
                    className='notes-title-input'
                    name='title'
                    value={title}
                    onChange={handleInputChange}
                />

                <textarea placeholder='What happened today?'
                    className='notes-textarea'
                    name='body'
                    value={body}
                    onChange={handleInputChange}
                ></textarea>


                {
                    url &&
                    (
                        <div className="notes-image">
                            <img src={url}
                                alt="Madrid" />
                        </div>
                    )
                }

                <div className="btn btn-danger mt-5"
                    onClick={handleDelete}>
                    Delete
                </div>

            </div>

        </div>
    )
}

export default NoteScreen
