import React from "react";
import { PacientesContext } from "./context";

export const PacientesContextProvider = ({ children }) => {

    return(
        <PacientesContext.Provider>
            {children}
        </PacientesContext.Provider>
    );
}