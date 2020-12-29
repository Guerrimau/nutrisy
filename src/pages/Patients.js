import React, { useContext, useEffect } from 'react'
import { PacientesContext } from '../context/pacientes-context'

//! Ejemplo de objeto paciente
    // const paciente = {
    //     nutriologoId: '0F42863E-09EE-43F1-B362-53FC838B3B98',
    //     nombreCompleto: "Mario Bros",
    //     email: "acezinofan@gmail.com",
    //     sexo: "MASCULINO",
    //     peso: 90,
    //     altura: 162,
    //     imc: 29,
    //     calorias: 2200
    // }

export const Patients = () => {
    
    const { pacientes, traerPacientes, crearPaciente } = useContext(PacientesContext);

    useEffect(() => {
        traerPacientes()
    },[])
    return (
        <div>
            <h1>Pacientes</h1>
        </div>
    )
}
