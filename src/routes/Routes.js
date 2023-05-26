import React from 'react';
import { BrowserRouter,HashRouter, Route } from 'react-router-dom';

import Inicio from '../pages/Inicio';
import Formularios from '../pages/Formularios';
import MenuPrincipal from '../pages/MenuPrincipal';
import Login from '../pages/Login';
import Curso from '../pages/Curso';
import Cards from '../pages/Cards';
import Inscrito from '../pages/Inscrito';
import BuscarCurso from '../pages/BuscarCurso';
import Quiz from '../pages/Quiz';

const Routes = () => {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Inicio} />
      <Route exact path="/formulario" component={Formularios} />
      <Route exact path="/menuPrincipal" component={MenuPrincipal} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/curso/:id" component={Curso} />
      <Route exact path="/cards" component={Cards} />
      <Route exact path="/inscrito" component={Inscrito} />
      <Route exact path="/buscarcurso" component={BuscarCurso} />
      <Route exact path="/quiz" component={Quiz} />
    </BrowserRouter>
  );
};

export default Routes;
