import React from 'react'
import '../style.css'

const Notification = ({ message, success }) => {

    if (message === null) {
        return null
    }

    if(success) {
        return (
            <div className="success">
                {message}
            </div>
        )
    }

    return (
        <div className="error">
            {message}
        </div>
    )
}

export default Notification