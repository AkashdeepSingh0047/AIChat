// Import React and the useState hook for managing component state
import React, { useState } from 'react'

// Import the two page components
import InitialPage from './initial-page'
import ContinuedPage from './continued-page'

// The Home component acts as the main controller or router between two views:
// 1. InitialPage — displayed when there's no input yet.
// 2. ContinuedPage — displayed once the user submits their first input.
const Home = () => {

    // State variable to store the first user message or input.
    // It determines which page (InitialPage or ContinuedPage) is shown.
    const [firstInput, setFirstInput] = useState('')

    return (
        <>
            {/* If user hasn't entered anything yet, show the initial landing page */}
            {!firstInput && <InitialPage setFirstInput={setFirstInput} />}

            {/* Once the user provides input, show the continued chat page */}
            {firstInput && <ContinuedPage firstInput={firstInput} setFirstInput={setFirstInput} />}
        </>
    )
}

// Export Home so it can be used as a top-level route or parent component
export default Home
