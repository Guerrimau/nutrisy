import React, { useState } from "react";
import { PacientesContext } from "./context";
import { ipcRenderer as ipc } from 'electron';

export const PacientesContextProvider = ({ children }) => {

    const [pacientes, setPacientes] = useState([]);

    const nutriologo ={
        nutriologoId: '0F42863E-09EE-43F1-B362-53FC838B3B98'
    }

    const traerPacientes = () => {
        ipc.invoke("TRAERPACIENTES", nutriologo.nutriologoId).then(items => {
            setPacientes(items)
        });
    }

    const crearPaciente = (paciente) => {
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
        ipc.invoke("ELIMINARPACIENTE", paciente).then(e => {
            traerPacientes();
        })
    }

    return(
        <PacientesContext.Provider value={{ pacientes, traerPacientes, crearPaciente, actualizarPaciente, eliminarPaciente }}>
            {children}
        </PacientesContext.Provider>
    );
}