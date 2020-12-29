import React, { useContext, useEffect } from 'react'
import { PacientesContext } from '../context/pacientes-context'

//! Ejemplo de objeto paciente
    const paciente = {
        pacienteId: '01DD356E-9E39-4A7A-AF2C-F01C50A1ECCC',
        nutriologoId: '0F42863E-09EE-43F1-B362-53FC838B3B98',
        nombreCompleto: "Gerardo Mayboca Ayala",
        email: "gmaybocaa@gmail.com",
        sexo: "MASCULINO",
        peso: 97,
        altura: 162,
        imc: 29,
        calorias: 2200
    }

export const Patients = () => {
    
    const { pacientes, traerPacientes, crearPaciente, actualizarPaciente } = useContext(PacientesContext);

    useEffect(() => {
        actualizarPaciente(paciente)
    },[])
    return (
        <div>
            <h1>Pacientes</h1>
            {
                pacientes.map(paciente => {
                    return <p>{paciente.nombreCompleto}</p>
                })
            }
        </div>
    )
}
