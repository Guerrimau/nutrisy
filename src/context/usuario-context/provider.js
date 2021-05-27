import React, { useState, useEffect } from "react";
import { ipcRenderer as ipc } from 'electron';
import { UsuarioContext } from "./context";

const initialState = {
    nutriologoId: "",
    isAuthenticated: false,
}

export const UsuarioContextProvider = ({ children }) => {
    const [state, setState] = useState(initialState);

    const setUsuario = (usuario) => {
        setState({
            ...usuario,
            isAuthenticated: true
        });
    };

    const cerrarSesion = () => {
        window.location.replace("/login");
        setState(initialState);
    }

    const injectActions = {
        usuario: state,
        isAuthenticated: state.isAuthenticated,
        setUsuario,
        cerrarSesion
    };

    return (
        <UsuarioContext.Provider value={injectActions}>
            {children}
        </UsuarioContext.Provider>
    );
};