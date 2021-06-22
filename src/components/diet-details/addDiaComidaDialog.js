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
import { ComidasContext } from '../../context/comidas-context';
import { DetallesContext } from '../../context/details-content';

export function AddDiaComidaDialog({ open, onClose, orden, dietaId }) {

    const { modeloComidas, traerComidas, crearDiaDieta } = useContext(DetallesContext);

    const [ formValues , handleInputChange, setFormValues ] = useForm({
        dietaId: dietaId,
        comidaId: '',
        gramos: '',
        calorias: '',
        ordenComida: orden.ordenComida,
        ordenDia: orden.ordenDia,
    });

    useEffect(() => {
        traerComidas();
    }, [])

    useEffect(() => {
        setFormValues(formValues => ({
            ...formValues,
            ordenComida: orden.ordenComida,
            ordenDia: orden.ordenDia,
        }));
    }, [orden])

    const handlePostDiaComida = () => {
        crearDiaDieta(formValues);
        onClose();
    }

    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Agregar comida</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="comidaId"
                    name="comidaId"
                    label="Comida"
                    placeholder="Comidas"
                    type="text"
                    fullWidth
                    select
                    onChange={handleInputChange}>
                    {
                        modeloComidas.map(comida => (
                            <MenuItem key={comida.comidaId} value={comida.comidaId}>{comida.nombre}</MenuItem>
                        ))
                    }
                </TextField>
                <TextField
                    autoFocus
                    margin="dense"
                    id="gramos"
                    label="Gramos"
                    type="number"
                    fullWidth
                    onChange={handleInputChange}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="calorias"
                    label="Calorias"
                    type="number"
                    fullWidth
                    onChange={handleInputChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancelar
          </Button>
                <Button onClick={handlePostDiaComida}  color="primary">
                    Agregar
          </Button>
            </DialogActions>
        </Dialog>
    );
}