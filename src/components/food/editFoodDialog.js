import React, { useState, useContext} from 'react';
import { useForm } from "../../hooks/useForm";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ComidasContext } from '../../context/comidas-context';

export function EditFoodDialog({ open, onClose, comida }) {

    console.log(comida)

    const { actualizarComida } = useContext(ComidasContext);

    const [ formValues , handleInputChange, setFormValues ] = useForm(comida);

    const handleUpdateFood = () => {
        actualizarComida(formValues);
        onClose();
    }

    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Nueva comida</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="nombre"
                    label="Nombre"
                    type="text"
                    fullWidth
                    onChange={handleInputChange}
                    value={formValues.nombre}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="ingredientes"
                    label="Ingredientes"
                    type="text"
                    fullWidth
                    onChange={handleInputChange}
                    value={formValues.ingredientes}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="calorias"
                    label="Calorias"
                    type="text"
                    fullWidth
                    onChange={handleInputChange}
                    value={formValues.calorias}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="gramos"
                    label="Gramos"
                    type="text"
                    fullWidth
                    onChange={handleInputChange}
                    value={formValues.gramos}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancelar
          </Button>
                <Button onClick={handleUpdateFood}  color="primary">
                    Actualizar
          </Button>
            </DialogActions>
        </Dialog>
    );
}