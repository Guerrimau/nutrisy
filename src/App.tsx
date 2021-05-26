import React from 'react';
import { AppRouter } from "./routes/AppRouter";
import { UsuarioContextProvider } from "./context/usuario-context";

const App = () => {
    return ( 
        <UsuarioContextProvider>
            <AppRouter /> 
        </UsuarioContextProvider>
    )
}

// Export the main component
export default App