import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startLogout } from '../../actions/auth'
import { startNewNote } from '../../actions/notes'
import JournalEntries from './JournalEntries'

const Sidebar = () => {

    const dispatch = useDispatch()

    const { name } = useSelector(state => state.auth)

    const handleClickLogout = () => {
        dispatch(startLogout())
    }

    const handleAddNewNote = () => {
        dispatch(startNewNote())
    }

    return (
        <aside className='journal-main-sidebar'>

            <div className="journal-sidebar-navbar">
                <h3 className=''>
                    <i className='far fa-moon'></i>
                    <span>{name}</span>
                </h3>

                <button onClick={handleClickLogout}
                    className='btn'>
                    Logout
                </button>
            </div>

            <div className="journal-new-entry"
                onClick={handleAddNewNote}>
                <i className='far fa-calendar-plus fa-5x'></i>
                <p>New entry</p>
            </div>

            <JournalEntries />

        </aside>
    )
}

export default Sidebar
