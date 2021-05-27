import React, { useState, useContext } from "react";
import { DietasContext } from "./context";
import { ipcRenderer as ipc } from "electron";
import { UsuarioContext } from "../usuario-context";

export const DietasContextProvider = ({ children }) => {

    const [dietas, setDietas] = useState([]);
    const [pacientes, setPacientes] = useState([]);

    const { usuario } = useContext(UsuarioContext);

    const traerPacientes = () => {
        ipc.invoke("TRAERPACIENTES", usuario.nutriologoId).then(items => {
            setPacientes(items)
        });
    }

    const traerDietas = () => {
        ipc.invoke("TRAERDIETAS", usuario.nutriologoId).then(items => {
            setDietas(items)
        });
    }

    const crearDieta = (dieta = {}) => {
        ipc.invoke("CREARDIETA", { ...dieta, nutriologoId: usuario.nutriologoId }).then(e => {
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