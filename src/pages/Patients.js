import React, { useContext } from 'react'
import { PacientesContext } from '../context/pacientes-context'

export const Patients = () => {
    
    const { pacientes } = useContext(PacientesContext);

    return (
        <div>
            <h1>Pacientes</h1>
        </div>
    )
}
