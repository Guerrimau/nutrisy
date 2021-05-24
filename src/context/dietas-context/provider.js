import React, { useState } from "react";
import { DietasContext } from "./context";
import { ipcRenderer as ipc } from "electron";

export const DietasContextProvider = ({ children }) => {

    const [dietas, setDietas] = useState([]);
    const [pacientes, setPacientes] = useState([]);

    const nutriologo ={
        nutriologoId: 'BCD6222A-B17B-47AA-803E-27FB5A66708B'
    }

    const traerPacientes = () => {
        ipc.invoke("TRAERPACIENTES", nutriologo.nutriologoId).then(items => {
            setPacientes(items)
        });
    }

    const traerDietas = () => {
        ipc.invoke("TRAERDIETAS", nutriologo.nutriologoId).then(items => {
            setDietas(items)
        });
    }

    const crearDieta = (dieta = {}) => {
        ipc.invoke("CREARDIETA", { ...dieta, nutriologoId: nutriologo.nutriologoId }).then(e => {
            traerDietas();
        })
    }

    const actualizarDieta = (dieta) => {
        ipc.invoke("ACTUALIZARDIETA", dieta).then(e => {
            traerDietas();
        })
    }

    const eliminarDieta = (dieta) => {
        ipc.invoke("ELIMINARDIETA", dieta).then(e => {
            traerDietas();
        })
    }

    return(
        <DietasContext.Provider value={{ dietas, traerDietas, crearDieta, actualizarDieta, eliminarDieta, pacientes, traerPacientes }}>
            {children}
        </DietasContext.Provider>
    );
}