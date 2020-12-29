import React, { useContext, useEffect } from 'react'
import { PacientesContext } from '../context/pacientes-context'

//! Ejemplo de objeto paciente
    // const paciente = {
    //     pacienteId: '9A110BEA-1915-4297-9758-1CF86A2D62D8',
    //     nutriologoId: '0F42863E-09EE-43F1-B362-53FC838B3B98',
    //     nombreCompleto: "Gerardo Mayboca Ayala",
    //     email: "gmaybocaa@gmail.com",
    //     sexo: "MASCULINO",
    //     peso: 97,
    //     altura: 162,
    //     imc: 29,
    //     calorias: 2200
    // }

export const Patients = () => {
    
    const { pacientes, traerPacientes, crearPaciente, actualizarPaciente, eliminarPaciente } = useContext(PacientesContext);

    useEffect(() => {
        traerPacientes();
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
