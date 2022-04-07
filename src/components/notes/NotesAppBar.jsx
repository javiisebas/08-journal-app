import moment from 'moment'
import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startSaveNote, startUploadingImage } from '../../actions/notes'

const NotesAppBar = () => {

    const { active } = useSelector(state => state.notes)
    const noteDate = moment(active.date).format('llll');

    const dispatch = useDispatch()

    const inputFile = useRef()

    const handleSaveNote = () => {
        dispatch(startSaveNote())
    }

    const handleUploadPicture = () => {
        inputFile.current.click()
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            dispatch(startUploadingImage(file))
        }
    }

    return (
        <div className='notes-appbar'>
            <span>{noteDate}</span>

            <input type="file"
                ref={inputFile}
                name='file'
                style={{ display: 'none' }}
                onChange={handleFileChange} />

            <div>
                <button className='btn'
                    onClick={handleUploadPicture}>
                    Picture
                </button>

                <button className='btn'
                    onClick={handleSaveNote}>
                    Save
                </button>
            </div>
        </div>
    )
}

export default NotesAppBar
