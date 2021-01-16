import React, { useState, useContext } from 'react';
import { useForm } from "../../hooks/useForm";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ComidasContext } from '../../context/comidas-context';
import { fileUpload } from '../../services/fileUpload';

export function EditFoodDialog({ open, onClose, comida }) {

    const { actualizarComida } = useContext(ComidasContext);

    const [formValues, handleInputChange, setFormValues] = useForm(comida);
    const [imagen, setImagen] = useState({
        url: comida?.imagen,
        loading: false,
    });


    const handleUpdateFood = () => {
        const comida = {
            ...formValues,
            imagen: imagen.url
        }
        actualizarComida(comida);
        onClose();
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
                                        style={{ fontSize: "90px" }} />
                                    <h3
                                        style={{
                                            margin: "0px"
                                        }}>Seleccionar imagen</h3>
                                </>
                                :
                                <Progress />
                            : null
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
                    value={formValues.nombre}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="ingredientes"
                    label="Ingredientes"
                    type="text"
                    fullWidth
                    multiline
                    rows={4}
                    onChange={handleInputChange}
                    value={formValues.ingredientes}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancelar
          </Button>
                <Button onClick={handleUpdateFood} color="primary">
                    Actualizar
          </Button>
            </DialogActions>
        </Dialog>
    );
}