// Import React library
import React, { useEffect } from 'react'
import { ipcRenderer as ipc } from 'electron'

const App = () => {

    const crearComida = () => {
        const comida = {
            nombre: 'Hot Cakes de Avena',
            ingredientes: '350gr de avena, 1/2 litro de leche, 1 huevo',
            calorias: 350,
            gramos: 100
        }
        ipc.invoke('CREARCOMIDA', comida)
    }

    useEffect( () => {
        crearComida();
        // ipc.invoke('GETCOMIDAS').then(items => {
        //     console.log(items)
        // })
    },[])

    return (
        <div> Hello from React!1</div>
    )
}

// Export the main component
export default App