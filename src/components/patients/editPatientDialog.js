import React, { useState, useContext, useEffect } from 'react';
import { useForm } from "../../hooks/useForm";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { PacientesContext } from '../../context/pacientes-context';

export function EditPatientDialog({ open, onClose, paciente }) {

    const { actualizarPaciente } = useContext(PacientesContext);
    const [ formValues , handleInputChange, setFormValues ] = useForm(paciente);


    const handleUpdatePatient = () => {
        actualizarPaciente(formValues);
        onClose();
    }

    useEffect(() => {
        let mounted = true
        if( mounted ) setFormValues(paciente)

        return function cleanup() {
            mounted = false
        }
    }, [paciente])


    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Editar paciente</DialogTitle>
            <DialogContent>
            <TextField
                    autoFocus
                    margin="dense"
                    id="nombreCompleto"
                    label="Nombre completo"
                    type="text"
                    fullWidth
                    onChange={handleInputChange}
                    value={formValues?.nombreCompleto}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="email"
                    label="Email"
                    type="text"
                    fullWidth
                    onChange={handleInputChange}
                    value={formValues?.email}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="sexo"
                    label="Sexo"
                    type="text"
                    fullWidth
                    onChange={handleInputChange}
                    value={formValues?.sexo}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="peso"
                    label="Peso"
                    type="text"
                    fullWidth
                    onChange={handleInputChange}
                    value={formValues?.peso}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="altura"
                    label="Altura"
                    type="text"
                    fullWidth
                    onChange={handleInputChange}
                    value={formValues?.altura}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="imc"
                    label="IMC"
                    type="text"
                    fullWidth
                    onChange={handleInputChange}
                    value={formValues?.imc}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="calorias"
                    label="Calorias"
                    type="text"
                    fullWidth
                    onChange={handleInputChange}
                    value={formValues?.calorias}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancelar
          </Button>
                <Button onClick={handleUpdatePatient}  color="primary">
                    Actualizar
          </Button>
            </DialogActions>
        </Dialog>
    );
}