import React from "react";
import { Fab } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { FoodCard } from "../diet-details/FoodCard";

export const FoodList = ({ comidas, ordenDia, handleAddDiaComida }) => {
  return (
    <div style={{ display: "flex", alignItems: "center", height: "312px" }}>
      {
        comidas.map(comida => (
          <FoodCard
            key={comida.comidaId}
            comida={comida} />
        ))
      }
      <Fab
        size="medium"
        style={{
          marginLeft: "20px",
          backgroundColor: '#3bb33d',
          color: "white"
        }}
        onClick={() => handleAddDiaComida(ordenDia)}>
        <Add colo="white" />
      </Fab>
    </div>
  )
};
