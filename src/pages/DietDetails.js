import React, { useEffect, useContext, useState } from 'react'
import { Button, Fab, Divider } from "@material-ui/core";
import { ArrowBack, Add, InsertDriveFile } from "@material-ui/icons";
import { DetallesContext } from '../context/details-content';
import { AddDiaComidaDialog } from "../components/diet-details/addDiaComidaDialog"
import { FoodList } from "../components/diet-details/FoodList";

export const DietDetails = (props) => {
   const diet = props.location.state;

   const [addDiaComidaDialog, setAddDiaComidaDialog] = useState({
      visible: false,
      ordenDia: 0,
   });

   const { traerDiaDietas, crearDiaDieta, diaComidas } = useContext(DetallesContext);

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
            <FoodList
               comidas={desayunos}
               ordenDia={1}
               handleAddDiaComida={handleAddDiaComida} />
            <h2>Comida</h2>
            <FoodList
               comidas={comidas}
               ordenDia={2}
               handleAddDiaComida={handleAddDiaComida} />
            <h2>Cena</h2>
            <FoodList
               comidas={cenas}
               ordenDia={3}
               handleAddDiaComida={handleAddDiaComida} />
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
