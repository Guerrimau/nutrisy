import React, { useEffect, useState } from "react";
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

    useEffect(() => {
        traerPacientes();
    },[])

    return(
        <PacientesContext.Provider value={{ pacientes }}>
            {children}
        </PacientesContext.Provider>
    );
}