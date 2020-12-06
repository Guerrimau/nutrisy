import React, { useEffect } from 'react'
import { ipcRenderer as ipc } from 'electron'

const App = () => {

    // const crearComida = (comida) => {
    //     const comida = {
    //         nombre: 'Hot Cakes de Avena',
    //         ingredientes: '350gr de avena, 1/2 litro de leche, 1 huevo',
    //         calorias: 350,
    //         gramos: 100
    //     }
    //     ipc.invoke('CREARCOMIDA', comida)
    // }

    // const eliminarComida = (comida) => {
    //     const comida = {
    //         comidaId: "D80A46E2-631C-4D27-A88B-8A413D16AF6A"
    //     }
    //     ipc.invoke("ELIMINARCOMIDA", comida).then( e => console.log(e))
    // }

    // const actualizarComida = (comida) => {
    //     const comida = {
    //         comidaId: "3A9EFE09-F17D-4C53-9A11-03F6ADEA753E",
    //         nombre: 'Hot Cakes',
    //         ingredientes: "200gr de harina, 1/2 litro de leche, 1 huevo",
    //         calorias: 500,
    //         gramos: 80
    //     }
    //     ipc.invoke("ACTUALIZARCOMIDA", comida).then( e => console.log(e))
    // }

    useEffect( () => {
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