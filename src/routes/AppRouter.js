import React, { useEffect } from 'react';
import {
   HashRouter,
   Switch,
   Route,
   Redirect,
   useHistory
} from "react-router-dom";

import { Navbar } from "../components/ui/Navbar";

import { ComidasContextProvider } from "../context/comidas-context"
import { PacientesContextProvider } from "../context/pacientes-context";
import { DietasContextProvider } from "../context/dietas-context";
import { DetallesContextProvider } from "../context/details-content";

import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { Food } from '../pages/Food';
import { Patients } from "../pages/Patients";
import { Diets } from "../pages/Diets";
import { DietDetails } from "../pages/DietDetails";
import { Binnacles } from "../pages/Binnacles";


export const AppRouter = () => {

   return (
      <HashRouter>
         <div>
            <Switch>
               <Route exact path='/' component={Login} />
               <Route exact path='/register' component={Register} />
               <Navbar>
                  <ComidasContextProvider>
                     <Route exact path='/food' component={Food} />
                  </ComidasContextProvider>
                  <PacientesContextProvider>
                     <Route exact path='/patients' component={Patients} />
                  </PacientesContextProvider>
                  <DietasContextProvider>
                     <Route exact path='/diet' component={Diets} />
                  </DietasContextProvider>
                  <DetallesContextProvider>
                     <Route exact path='/details' component={DietDetails} />
                  </DetallesContextProvider>
                  <Route exact path='/binnacle' component={Binnacles} />
               </Navbar>
            </Switch>
         </div>
      </HashRouter>
   )
}
