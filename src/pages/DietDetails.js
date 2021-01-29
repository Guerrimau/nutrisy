import React, { useEffect, useContext, useState } from 'react'
import { Button, Fab, Divider } from "@material-ui/core";
import { ArrowBack, Add, InsertDriveFile } from "@material-ui/icons";
import { DetallesContext } from '../context/details-content';
import { AddDiaComidaDialog } from "../components/diet-details/addDiaComidaDialog"
import { FoodCard } from '../components/diet-details/foodCard';

export const DietDetails = (props) => {
    const [addDiaComidaDialog, setAddDiaComidaDialog] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState({
        ordenDia: 0,
        ordenComida: 0
    });

    const diet = props.location.state;
    
    const { traerDiaDietas, crearDiaDieta, comidas } = useContext(DetallesContext);

    const dias = ["Lunes","Martes","Miercoles","Jueves","Viernes"]

    useEffect(() => {
        traerDiaDietas(diet.dietaId);
    }, [])

    const handelArrowBack = () => {
        props.history.goBack();
    }

    const handleAddDiaComida = () => {
        setAddDiaComidaDialog(true);
    }

    const handleCloseDiaComida = () => {
        setAddDiaComidaDialog(false);
    }

    return (
        <div>
            <Button
                color="primary"
                style={{position: "relative", left: "0px", top: "20px", backgroundColor: '#3bb33d', color: "white"}}
                onClick={handelArrowBack}>
                <ArrowBack/>
            </Button>
            <div style={{padding: "20px"}}>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <h1 style={{marginBottom: "0"}}>{diet.nombreDieta}</h1>
                    <h3>{diet.fechaInicio.toLocaleDateString()}</h3>
                </div>
                <h4 style={{margin: "0", color: "grey"}}>{diet.nombreCompleto}</h4>
            </div>
            <Divider />
            <div style={{padding:"50px"}}>
                <div style={{display:"flex", alignItems: "center"}}>
                    {
                        comidas.map(comida => (
                            <FoodCard comida={comida} /> 
                        ))
                    }
                    <Fab
                        size="medium"
                        onClick={handleAddDiaComida}>
                        <Add colo="white"/>
                    </Fab>
                </div>
                <AddDiaComidaDialog open={addDiaComidaDialog} onClose={handleCloseDiaComida} orden={selectedOrder} dietaId={diet.dietaId} />
            </div>
        </div>
    )
}
