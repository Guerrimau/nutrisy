import React, { useState } from "react";
import { PacientesContext } from "./context";
import { ipcRenderer as ipc } from 'electron';

export const PacientesContextProvider = ({ children }) => {

    const [pacientes, setPacientes] = useState([]);

    const nutriologo = {
        nutriologoId: '8E4508B0-5399-4A1D-9AC2-E4CB6ADCCA9A'
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