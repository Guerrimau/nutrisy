import React, { useState, useEffect } from "react";
import { ComidasContext } from "./context";
import { ipcRenderer as ipc } from 'electron'

//! Estructura del objeto comida
// const comida = {
//     comidaId: "3A9EFE09-F17D-4C53-9A11-03F6ADEA753E",
//     nombre: 'Hot Cakes',
//     ingredientes: "200gr de harina, 1/2 litro de leche, 1 huevo",
//     calorias: 500,
//     gramos: 80
// }

export const ComidasContextProvider = ({ children }) => {

    const [comidas, setComidas] = useState([])

    const crearComida = (comida) => {
        ipc.invoke('CREARCOMIDA', comida).then( e => traerComidas());
    }

    const eliminarComida = (comida) => {
        console.log(comida)
        ipc.invoke("ELIMINARCOMIDA", comida).then( e => traerComidas());
    }

    const actualizarComida = (comida) => {
        ipc.invoke("ACTUALIZARCOMIDA", comida).then( e => traerComidas());
    }

    const traerComidas = () => {
        ipc.invoke('GETCOMIDAS').then(items => {
            setComidas(items)
        })
    }

    useEffect( () => {
        traerComidas();
    },[])

    return (
        <ComidasContext.Provider value={{ comidas, crearComida, eliminarComida, actualizarComida, traerComidas }}>
            { children }
        </ComidasContext.Provider>
    );
} 