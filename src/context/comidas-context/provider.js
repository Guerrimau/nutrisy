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
        let comidaEliminadaId = comida.comidaId;
        ipc.invoke("ELIMINARCOMIDA", comida).then( e => 
            setComidas((prev) => (prev.filter(comida => comida.comidaId !== comidaEliminadaId)))
        );
    }

    const actualizarComida = (nuevaComida) => {
        ipc.invoke("ACTUALIZARCOMIDA", comida).then( e => 
            setComidas((prev) =>(
                prev.map(comida => {
                    if(comida.comidaId === nuevaComida.comidaId ) {
                        return {
                            comidaId: nuevaComida.comidaId,
                            nombre: nuevaComida.nombre,
                            ingredientes: nuevaComida.ingredientes,
                            calorias: nuevaComida.calorias,
                            gramos: nuevaComida.gramos
                        }
                    } else {
                        return comida
                    }
                })
            ))
        );
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
        <ComidasContext.Provider value={{ comidas, crearComida, eliminarComida, actualizarComida }}>
            { children }
        </ComidasContext.Provider>
    );
} 