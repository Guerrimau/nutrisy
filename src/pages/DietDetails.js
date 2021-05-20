import React, { useEffect, useContext, useState } from 'react'
import { Button, Fab, Divider } from "@material-ui/core";
import { ArrowBack, Add, InsertDriveFile } from "@material-ui/icons";
import { DetallesContext } from '../context/details-content';
import { AddDiaComidaDialog } from "../components/diet-details/addDiaComidaDialog"
import { FoodCard } from '../components/diet-details/foodCard';

export const DietDetails = (props) => {
    const [addDiaComidaDialog, setAddDiaComidaDialog] = useState({
        visible: false,
        ordenDia: 0,
    });

    const diet = props.location.state;

    const { traerDiaDietas, crearDiaDieta, diaComidas } = useContext(DetallesContext);

    console.log(diaComidas);

    const desayunos = diaComidas.filter(comida => comida.ordenDia === 1);
    const comidas = diaComidas.filter(comida => comida.ordenDia === 2);
    const cenas = diaComidas.filter(comida => comida.ordenDia === 3);

    useEffect(() => {
        traerDiaDietas(diet.dietaId);
    }, [])

    const handelArrowBack = () => {
        props.history.goBack();
    }

    const handleAddDiaComida = (ordenDia) => {
        setAddDiaComidaDialog({
            visible: true,
            ordenDia
        });
    }

    const handleCloseDiaComida = () => {
        setAddDiaComidaDialog({
            visible: false,
            ordenDia: 0
        });
    }

    return (
        <div>
            <Button
                color="primary"
                style={{ position: "relative", left: "0px", top: "20px", backgroundColor: '#3bb33d', color: "white" }}
                onClick={handelArrowBack}>
                <ArrowBack />
            </Button>
            <div style={{ padding: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <h1 style={{ marginBottom: "0" }}>{diet.nombreDieta}</h1>
                    <h3>{diet.fechaInicio.toLocaleDateString()}</h3>
                </div>
                <h4 style={{ margin: "0", color: "grey" }}>{diet.nombreCompleto}</h4>
            </div>
            <Divider />
            <div style={{ padding: "50px" }}>
                <h2>Desayuno</h2>
                <div style={{ display: "flex", alignItems: "center", height: "312px" }}>
                    {
                        desayunos.map(comida => (
                            <FoodCard comida={comida} />
                        ))
                    }
                    <Fab
                        size="medium"
                        style={{
                            marginLeft: "20px",
                            backgroundColor: '#3bb33d',
                            color: "white"
                        }}
                        onClick={() => handleAddDiaComida(1)}>
                        <Add colo="white" />
                    </Fab>
                </div>
                <h2>Comida</h2>
                <div style={{ display: "flex", alignItems: "center", height: "312px" }}>
                    {
                        comidas.map(comida => (
                            <FoodCard comida={comida} />
                        ))
                    }
                    <Fab
                        size="medium"
                        style={{
                            marginLeft: "20px",
                            backgroundColor: '#3bb33d',
                            color: "white"
                        }}
                        onClick={() => handleAddDiaComida(2)}>
                        <Add colo="white" />
                    </Fab>
                </div>
                <h2>Cena</h2>
                <div style={{ display: "flex", alignItems: "center", height: "312px" }}>
                    {
                        cenas.map(comida => (
                            <FoodCard comida={comida} />
                        ))
                    }
                    <Fab
                        size="medium"
                        style={{
                            marginLeft: "20px",
                            backgroundColor: '#3bb33d',
                            color: "white"
                        }}
                        onClick={() => handleAddDiaComida(3)}>
                        <Add colo="white" />
                    </Fab>
                </div>
                <AddDiaComidaDialog
                    open={addDiaComidaDialog.visible}
                    onClose={handleCloseDiaComida}
                    orden={{
                        ordenDia: addDiaComidaDialog.ordenDia
                    }}
                    dietaId={diet.dietaId} />
            </div>
        </div>
    )
}
