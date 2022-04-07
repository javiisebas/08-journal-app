import moment from 'moment'
import React from 'react'
import { useDispatch } from 'react-redux'
import { activeNote } from '../../actions/notes'

const JournalEntry = ({ id, title, body, date, url }) => {

    const noteDate = moment(date)

    const dispatch = useDispatch()

    const handleSelectNote = () => {
        dispatch(activeNote(id, {
            title, body, date, url
        }))
    }

    return (
        <div className='journal-entry pointer'
            onClick={handleSelectNote}>

            {
                url && (
                    <div className='journal-entry-picture'
                        style={{
                            backgroundImage: `url(${url})`
                        }}></div>
                )
            }

            <div className="journal-entry-body">
                <p className="journal-entry-title">
                    {title}
                </p>
                <p className="journal-entry-content">
                    {body}
                </p>
            </div>

            <div className="journal-entry-date-box">
                <span>{noteDate.format('dddd')}</span>
                <h4>{noteDate.format('Do')}</h4>
            </div>
        </div>
    )
}

export default JournalEntry
