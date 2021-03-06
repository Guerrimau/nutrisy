import React, { useState, useEffect, useContext } from "react";
import { ipcRenderer as ipc } from "electron";
import { DetallesContext } from './context';
import { UsuarioContext } from "../usuario-context";

export const DetallesContextProvider = ({ children }) => {

    const [diaComidas, setDiaComidas] = useState([]);
    const [modeloComidas, setModeloComidas] = useState([]);

    const { usuario } = useContext(UsuarioContext);

    const createdBy = usuario.fullName;

    const traerDiaDietas = (dietaId) => {
        ipc.invoke('TRAERDIADIETAS', {dietaId}).then(items => {
            setDiaComidas(items)
        })
    }

    const traerComidas = () => {
        ipc.invoke('GETCOMIDAS').then(items => {
            setModeloComidas(items)
        })
    }

    const borrarDiaDieta = (diaDietaId) => {
        ipc.invoke('ELIMINARDIADIETA', {diaDietaId}).then( e => {
            traerDiaDietas(diaDieta.dietaId)
        })
    }

    const crearDiaDieta = (diaDieta) => {
        ipc.invoke('CREARDIADIETA', {...diaDieta, createdBy}).then( e => {
            traerDiaDietas(diaDieta.dietaId)
        })
    }


    return (
        <DetallesContext.Provider value={{ diaComidas, modeloComidas, traerDiaDietas, traerComidas, crearDiaDieta, borrarDiaDieta }}>
            { children }
        </DetallesContext.Provider>
    );
}