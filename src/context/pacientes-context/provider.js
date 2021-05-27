import React, { useState, useContext } from "react";
import { PacientesContext } from "./context";
import { ipcRenderer as ipc } from 'electron';
import { UsuarioContext } from "../usuario-context";

export const PacientesContextProvider = ({ children }) => {

    const [pacientes, setPacientes] = useState([]);

    const { usuario } = useContext(UsuarioContext);

    const traerPacientes = () => {
        ipc.invoke("TRAERPACIENTES", usuario.nutriologoId).then(items => {
            setPacientes(items)
        });
    }

    const crearPaciente = (paciente = {}) => {
        paciente.nutriologoId = usuario.nutriologoId
        ipc.invoke("CREARPACIENTE", paciente).then(e => {
            traerPacientes();
        })
    }

    const actualizarPaciente = (paciente) => {
        ipc.invoke("ACTUALIZARPACIENTE", paciente).then(e => {
            traerPacientes();
        })
    }

    const eliminarPaciente = (paciente) => {
        ipc.invoke("ELIMINARPACIENTE", paciente).then(res => {
            console.log(res);
        });
    }

    return (
        <PacientesContext.Provider value={{ pacientes, traerPacientes, crearPaciente, actualizarPaciente, eliminarPaciente }}>
            {children}
        </PacientesContext.Provider>
    );
}