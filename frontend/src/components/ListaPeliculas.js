import React, { Component } from 'react';
import Navigation from './Navigation';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Pelicula from './Pelicula';

class ListaPeliculas extends Component {

    constructor() {
        super();
        this.state={
        	peliculas: []
        };
    }
    componentDidMount() {
	    fetch("http://localhost:3001/movies",{method: 'GET'})
	      .then(response => response.json())
	      .then(peliculas => this.setState({ peliculas }));
	};
    

    render() {
    	const peliculas = this.state.peliculas.map((pelicula,i) => {
    		return (
                <Pelicula key={pelicula.id} id={pelicula.id} titulo={pelicula.title} ></Pelicula>
            )
    	}) 

        return (
            <React.Fragment>
            <Navigation></Navigation>
            <Button href={'/agregar-pelicula'} variant="success" style={{margin:"20px 20px"}}>Agregar una Pelicula</Button>
            <Button href={`/`} variant="primary">Inicio</Button>
            	<Container>
                    <Row>
                       <Col md={4}>{peliculas}</Col>
                    </Row>
                </Container>
            </React.Fragment>
        );
    }
}

export default ListaPeliculas;
