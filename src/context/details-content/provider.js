import React, { useState, useEffect } from "react";
import { ipcRenderer as ipc } from "electron";
import { DetallesContext } from './context';

export const DetallesContextProvider = ({ children }) => {

    const [comidas, setComidas] = useState([]);
    const [modeloComidas, setModeloComidas] = useState([]);

    const traerDiaDietas = (dietaId) => {
        ipc.invoke('TRAERDIADIETAS', {dietaId}).then(items => {
            setComidas(items)
        })
    }

    const traerComidas = () => {
        ipc.invoke('GETCOMIDAS').then(items => {
            setModeloComidas(items)
        })
    }

    const crearDiaDieta = (diaDieta) => {
        ipc.invoke('CREARDIADIETA', diaDieta).then( e => {
            traerDiaDietas(diaDieta.dietaId)
        })
    }

    return (
        <DetallesContext.Provider value={{ comidas, modeloComidas, traerDiaDietas, traerComidas, crearDiaDieta }}>
            { children }
        </DetallesContext.Provider>
    );
}