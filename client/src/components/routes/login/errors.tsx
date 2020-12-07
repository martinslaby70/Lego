import React from 'react'

interface props {
    errors: string[]
}
const Errors = ({errors}:props) => {


    const displayErrors = errors.map((err, index) => {
        return(
            <div key={index}>
                <p>{err}</p>
            </div>
        )
    })

    return(
        <div>
            {displayErrors}
        </div>
    )
}

export default Errors