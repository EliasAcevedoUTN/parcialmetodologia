import React, { Component } from 'react';
import './App.css';
import Home from './components/Home';
import ListaPeliculas from './components/ListaPeliculas';
import AgregarPelicula from './components/AgregarPelicula';
import DetallePelicula from './components/DetallePelicula';
import BorrarPelicula from './components/BorrarPelicula';
import ActualizarPelicula from './components/ActualizarPelicula';
import { Switch, Route } from 'react-router-dom';

class App extends Component {

  render(){
    return(
      <Switch>
        <Route exact path="/" component={Home} ></Route>
        <Route exact path="/lista-peliculas" component={ListaPeliculas} ></Route>
        <Route exact path="/agregar-pelicula" component={AgregarPelicula} ></Route>
        <Route exact path="/detalle-pelicula/:id" component={DetallePelicula} ></Route>
        <Route exact path="/borrar-pelicula/:id" component={BorrarPelicula} ></Route>
        <Route exact path="/actualizar-pelicula/:id" component={ActualizarPelicula} ></Route>
      </Switch>
    ) 
  }
}

export default App;
