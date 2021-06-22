import React, { useState, useContext, useEffect } from 'react';
import { useForm } from "../../hooks/useForm";
import { MenuItem, Select, InputLabel } from "@material-ui/core";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers"
import DateFnsUtils from "@date-io/date-fns";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { DietasContext } from '../../context/dietas-context';

export function NewDietDialog({ open, onClose }) {

    const { crearDieta, pacientes = [], traerPacientes } = useContext(DietasContext);

    const [formValues, handleInputChange, setValues] = useForm({
        pacienteId: '',
        nombreDieta: '',
        fechaInicio: new Date().toISOString(),
    });

    const handleDateChange = (e) => {
        const date = new Date(e).toISOString()
        setValues(prevState => ({
            ...formValues,
            fechaInicio: date
        }))
    }

    const handlePostDiet = () => {
        crearDieta(formValues);
        onClose();
    }

    useEffect(() => {
        traerPacientes();
    }, [])

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Nueva dieta</DialogTitle>
                <DialogContent>
                    <InputLabel id="pacienteLbl">Paciente</InputLabel>
                    <Select
                        id="pacienteId"
                        name="pacienteId"
                        labelId="pacienteLbl"
                        label="Paciente"
                        style={{ minWidth: "551px" }}
                        onChange={handleInputChange}>
                        {
                            pacientes.map(paciente => (
                                <MenuItem key={paciente.pacienteId} value={paciente.pacienteId}>{paciente.nombreCompleto}</MenuItem>
                            ))
                        }
                    </ Select>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="nombreDieta"
                        label="Nombre de Dieta"
                        type="text"
                        fullWidth
                        onChange={handleInputChange}
                    />
                    <DatePicker
                        format="dd/MM/yyyy"
                        id="fechaInicio"
                        label="Fecha de inicio"
                        style={{ minWidth: "551px" }}
                        value={formValues.fechaInicio}
                        onChange={handleDateChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handlePostDiet} color="primary">
                        Agregar
                    </Button>
                </DialogActions>
            </Dialog>
        </MuiPickersUtilsProvider>
    );
}