import React, { useState, useContext} from 'react';
import { useForm } from "../../hooks/useForm";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { PacientesContext } from '../../context/pacientes-context';

export function NewPatientDialog({ open, onClose }) {

    const { crearPaciente } = useContext(PacientesContext);

    const [ formValues , handleInputChange ] = useForm({
        nombreCompleto: '',
        email: '',
        sexo: '',
        peso: '',
        altura: '',
        imc: '',
        calorias: '',
    });

    const handlePostPatient = () => {
        crearPaciente(formValues);
        onClose();
    }

    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Nuevo paciente</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="nombreCompleto"
                    label="Nombre completo"
                    type="text"
                    fullWidth
                    onChange={handleInputChange}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="email"
                    label="Email"
                    type="text"
                    fullWidth
                    onChange={handleInputChange}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="sexo"
                    label="Sexo"
                    type="text"
                    fullWidth
                    onChange={handleInputChange}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="peso"
                    label="Peso"
                    type="text"
                    fullWidth
                    onChange={handleInputChange}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="altura"
                    label="Altura"
                    type="text"
                    fullWidth
                    onChange={handleInputChange}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="imc"
                    label="IMC"
                    type="text"
                    fullWidth
                    onChange={handleInputChange}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="calorias"
                    label="Calorias"
                    type="text"
                    fullWidth
                    onChange={handleInputChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancelar
          </Button>
                <Button onClick={handlePostPatient}  color="primary">
                    Agregar
          </Button>
            </DialogActions>
        </Dialog>
    );
}