import React, { useState, useContext, useEffect } from 'react';
import { useForm } from "../../hooks/useForm";
import { MenuItem } from "@material-ui/core";
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

    const [ formValues , handleInputChange ] = useForm({
        pacienteId: '',
        nombreDieta: '',
        fechaInicio: '',
    });

    const handlePostDiet = () => {
        crearDieta(formValues);
        onClose();
    }

    useEffect(() => {
        traerPacientes();
    }, [])

    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Nueva dieta</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="pacienteId"
                    name="pacienteId"
                    label="Paciente"
                    type="text"
                    fullWidth
                    select
                    onChange={handleInputChange}>
                    {
                        pacientes.map(paciente => (
                            <MenuItem key={paciente.pacienteId} value={paciente.pacienteId}>{paciente.nombreCompleto}</MenuItem>
                        ))
                    }
                </TextField>
                <TextField
                    autoFocus
                    margin="dense"
                    id="nombreDieta"
                    label="Nombre de Dieta"
                    type="text"
                    fullWidth
                    onChange={handleInputChange}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="fechaInicio"
                    label="Fecha de Inicio"
                    type="date"
                    fullWidth
                    onChange={handleInputChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancelar
          </Button>
                <Button onClick={handlePostDiet}  color="primary">
                    Agregar
          </Button>
            </DialogActions>
        </Dialog>
    );
}