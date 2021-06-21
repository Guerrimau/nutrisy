import React, { useState, useContext } from "react";
import { PacientesContext } from "./context";
import { ipcRenderer as ipc } from 'electron';
import { UsuarioContext } from "../usuario-context";

export const PacientesContextProvider = ({ children }) => {

    const [pacientes, setPacientes] = useState([]);

    const { usuario } = useContext(UsuarioContext);

    const createdBy = usuario.fullName;

    const traerPacientes = () => {
        ipc.invoke("TRAERPACIENTES", usuario.nutriologoId).then(items => {
            setPacientes(items)
        });
    }

    const crearPaciente = (paciente = {}) => {
        paciente.nutriologoId = usuario.nutriologoId
        ipc.invoke("CREARPACIENTE", {...paciente, createdBy }).then(e => {
            traerPacientes();
        })
    }

    const actualizarPaciente = (paciente) => {
        ipc.invoke("ACTUALIZARPACIENTE", {...paciente, createdBy}).then(e => {
            traerPacientes();
        })
    }

    const eliminarPaciente = (paciente) => {
        ipc.invoke("ELIMINARPACIENTE", {...paciente, createdBy}).then(res => {
            traerPacientes();
        });
    }

    return (
        <PacientesContext.Provider value={{ pacientes, traerPacientes, crearPaciente, actualizarPaciente, eliminarPaciente }}>
            {children}
        </PacientesContext.Provider>
    );
}