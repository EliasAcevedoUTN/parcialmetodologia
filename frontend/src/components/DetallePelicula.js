import React, { Component } from 'react';
import Navigation from './Navigation';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

class DetallePelicula extends Component {

    constructor() {
        super();
        this.state = {
        	pelicula: []
        }
    }

    componentDidMount() {
    	const id = this.props.match.params.id;
	    fetch(`http://localhost:3001/movies/detail/${id}`,{method: 'GET'})
	      .then(response => response.json())
	      .then(pelicula => this.setState({ pelicula }));
	};

    render() {
    	const pelicula = this.state.pelicula;
        return (
        	<React.Fragment>
	        	<Navigation></Navigation>
	        	<Container>
		        	<h1>{pelicula.title}</h1>
		        	<p>
		        		RATING: {pelicula.rating} <br/>
		        		AWARDS: {pelicula.awards} <br/>
		        		LENGTH: {pelicula.length} <br/>
		        		RELEASE DATE: {pelicula.release_date} <br/>
		        	</p>
		        	<span><Button href={`/actualizar-pelicula/${pelicula.id}`} variant="success" style={{margin:"5px 5px"}}>Modificar</Button></span>
		        	<span><Button href={`/borrar-pelicula/${pelicula.id}`} variant="danger" style={{margin:"5px 5px"}}>Borrar</Button></span>
		        	<span><Button href={`/lista-peliculas`} variant="primary" style={{margin:"5px 5px"}}>Listado de Películas</Button></span>
	        	</Container>
            </React.Fragment>
        );
    }
}

export default DetallePelicula;
