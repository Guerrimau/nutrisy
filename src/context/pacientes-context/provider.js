import React, { useState } from "react";
import { PacientesContext } from "./context";
import { ipcRenderer as ipc } from 'electron';

export const PacientesContextProvider = ({ children }) => {

    const [pacientes, setPacientes] = useState([]);

    const nutriologo = {
        nutriologoId: 'BCD6222A-B17B-47AA-803E-27FB5A66708B'
    }

    const traerPacientes = () => {
        ipc.invoke("TRAERPACIENTES", nutriologo.nutriologoId).then(items => {
            setPacientes(items)
        });
    }

    const crearPaciente = (paciente = {}) => {
        paciente.nutriologoId = nutriologo.nutriologoId
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