import React, { useState, useContext, useEffect, useCallback } from 'react'
import { TableContainer, Typography, Button, TextField, IconButton, Fab } from '@material-ui/core';
import {
    Edit,
    Delete,
    InsertDriveFile
} from "@material-ui/icons";
import XLSX from "xlsx";
import FileSaver from "file-saver";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { PacientesContext } from '../context/pacientes-context'
import ToolTip from '../components/shared/ToolTip';
import { NewPatientDialog } from "../components/patients/newPatientDialog";
import { EditPatientDialog } from "../components/patients/editPatientDialog";

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

    const [selectedPatient, setSelectedPatient] = useState({});
    const [addDialog, setAddDialog] = useState(false);
    const [editDialog, setEditDialog] = useState(false);

    const { pacientes, traerPacientes, crearPaciente, actualizarPaciente, eliminarPaciente } = useContext(PacientesContext);

    useEffect(() => {
        traerPacientes();
    }, [])

    const handleAddDialogClick = () => {
        setAddDialog(!addDialog);
    }

    const handleEditDialogClick = (patient) => {
        setSelectedPatient(patient)
        setEditDialog(!editDialog);
    }

    function s2ab(s) {
        var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
        var view = new Uint8Array(buf);  //create uint8array as viewer
        for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; //convert to octet
        return buf;
    }

    const handleDescargarPacientes = () => {
        var wb = XLSX.utils.book_new();
        wb.Props = {
            Title: "Pacientes",
            Subject: "Nutriologo",
            Author: "",
            CreatedDate: new Date().getFullYear()
        }
        wb.SheetNames.push("Pacientes Enero")
        var ws_data = pacientes;
        var ws = XLSX.utils.json_to_sheet(ws_data);
        wb.Sheets["Pacientes Enero"] = ws
        var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' })
        FileSaver.saveAs(new Blob([s2ab(wbout)], {type: "application/octet-stream"}), 'pacientes.xlsx')
    }

    return (
        <div>
            <h1>Pacientes</h1>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Sexo</TableCell>
                            <TableCell>Peso</TableCell>
                            <TableCell>Altura</TableCell>
                            <TableCell>IMC</TableCell>
                            <TableCell>Calorias</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {pacientes !== undefined ?
                            pacientes.map((item) => (
                                <TableRow key={item.email}>
                                    <TableCell component="th" scope="row" width='5.0em'>
                                        {item.nombreCompleto}
                                    </TableCell>
                                    <TableCell component="th" scope="row" width='2.5em'>
                                        {item.email}
                                    </TableCell>
                                    <TableCell component="th" scope="row" width='5.5em'>
                                        {item.sexo}
                                    </TableCell>
                                    <TableCell component="th" scope="row" width='2.5em'>
                                        {item.peso}
                                    </TableCell>
                                    <TableCell component="th" scope="row" width='2.5em'>
                                        {item.altura}
                                    </TableCell>
                                    <TableCell component="th" scope="row" width='2.5em'>
                                        {item.imc}
                                    </TableCell>
                                    <TableCell component="th" scope="row" width='2.5em'>
                                        {item.calorias}
                                    </TableCell>
                                    <TableCell component="th" scope="row" width='9.5em'>
                                        <IconButton
                                            onClick={() => handleEditDialogClick(item)}
                                        >
                                            <Edit />
                                        </IconButton>
                                        <IconButton
                                            onClick={() => eliminarPaciente(item)}
                                        >
                                            <Delete />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            )) : null}
                    </TableBody>
                </Table>
            </TableContainer>
            <Fab
                onClick={handleDescargarPacientes}
                variant="extended"
                style={{
                    backgroundColor: '#3bb33d',
                    color: "white",
                    position: "fixed",
                    left: "105px",
                    bottom: "15px" }}>
                Descargar Pacientes
                <InsertDriveFile />
            </Fab>
            <ToolTip onOpen={handleAddDialogClick} />
            <NewPatientDialog open={addDialog} onClose={handleAddDialogClick} />
            <EditPatientDialog open={editDialog} onClose={handleEditDialogClick} paciente={selectedPatient} />
        </div>
    )
}
