// Import React library
import React, { useEffect } from 'react'
import { ipcRenderer as ipc } from 'electron'

const App = () => {

    // const getStudents = () => {
    //     ipc.invoke('getstudents').then((items) => { 
    //         console.log(items)
    //     })
    // }

    useEffect( () => {
        ipc.invoke('loginfo', "QUE PEDO CULEROS")
    },[])

    return (
        <div> Hello from React!1</div>
    )
}

// Export the main component
export default App