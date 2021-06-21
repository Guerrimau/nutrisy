import React, { useState, useContext, useEffect } from 'react';
import { useForm } from "../../hooks/useForm";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Progress from '@material-ui/core/CircularProgress';
import { ComidasContext } from '../../context/comidas-context';
import { fileUpload } from "../../services/fileUpload";

const imagenInitialState = {
    url: null,
    loading: false,
}

export function NewFoodDialog({ open, onClose }) {

    const { crearComida } = useContext(ComidasContext);

    const [formValues, handleInputChange] = useForm({
        nombre: '',
        ingredientes: '',
    });
    const [imagen, setImagen] = useState(imagenInitialState);

    const handlePostFood = () => {
        const comida = {
            ...formValues,
            imagen: imagen.url
        }
        crearComida(comida);
        onClose();
        setImagen(imagenInitialState)
    }

    const handleClose = () => {
        onClose()
        setImagen(imagenInitialState)
    }

    const handlePictureClick = () => {
        document.querySelector('#fileSelector').click();
    }

    const handleFileChange = (e) => {
        setImagen(prev => ({
            ...prev,
            loading: true
        }))
        const file = e.target.files[0];
        fileUpload(file).then(url => {
            setImagen({
                loading: false,
                url: url
            })
        });
    }

    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Nueva comida</DialogTitle>
            <DialogContent>
                <div
                    style={{
                        backgroundImage: `url(${imagen?.url})`,
                        backgroundSize: "cover",
                        width: "100%",
                        height: "200px",
                        color: "white",
                        backgroundColor: "#E6E6E6",
                        borderRadius: "10px",
                        display: "flex",
                        flexDirection: "column",
                        cursor: "pointer",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                    onClick={handlePictureClick}>
                    {
                        !imagen.url
                            ?   
                                !imagen.loading 
                                    ?
                                        <>
                                            <PhotoCameraIcon
                                                style={{ fontSize: "90px" }}/>
                                            <h3
                                                style={{
                                                margin: "0px"
                                            }}>Seleccionar imagen</h3>
                                        </>
                                    :
                                        <Progress />
                            :   null
                    }
                </div>
                <input
                    id="fileSelector"
                    type="file"
                    name="file"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="nombre"
                    label="Nombre"
                    type="text"
                    fullWidth
                    onChange={handleInputChange}
                />
                <TextField
                    margin="dense"
                    id="ingredientes"
                    label="Ingredientes"
                    type="text"
                    fullWidth
                    multiline
                    rows={4}
                    onChange={handleInputChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancelar
          </Button>
                <Button onClick={handlePostFood} color="primary">
                    Agregar
          </Button>
            </DialogActions>
        </Dialog>
    );
}