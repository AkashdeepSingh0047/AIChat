import React, { useState } from 'react'
import InitialPage from './initial-page'
import ContinuedPage from './continued-page'

const Home = () => {
    const [firstInput, setFirstInput] = useState('')
    
    return (
        <>
            {!firstInput && <InitialPage setFirstInput={setFirstInput} />}
            {firstInput && <ContinuedPage firstInput={firstInput} />}
        </>
    )
}

export default Home