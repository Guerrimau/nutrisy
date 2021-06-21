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

export function EditDietDialog({ open, onClose, dieta }) {

    const { pacientes = [], traerPacientes, actualizarDieta } = useContext(DietasContext);

    const [ formValues , handleInputChange, setFormValues ] = useForm(dieta);

    const handleUpdateDiet = () => {
        actualizarDieta(formValues);
        onClose();
    }

    useEffect(() => {
        traerPacientes();
    }, [])

    useEffect(() => {
        let mounted = true
        if( mounted ) setFormValues(dieta)

        return function cleanup() {
            mounted = false
        }
    }, [dieta])

    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Editar dieta</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="nombreDieta"
                    label="Nombre de Dieta"
                    type="text"
                    fullWidth
                    value={formValues?.nombreDieta}
                    onChange={handleInputChange}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="fechaInicio"
                    label="Fecha de Inicio"
                    type="date"
                    fullWidth
                    value={formValues?.fechaInicio?.toLocaleString()}
                    onChange={handleInputChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancelar
          </Button>
                <Button onClick={handleUpdateDiet}  color="primary">
                    Guardar
          </Button>
            </DialogActions>
        </Dialog>
    );
}