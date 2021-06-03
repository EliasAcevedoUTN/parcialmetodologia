import React, { Component } from 'react';
import Navigation from './Navigation';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

class BorrarPelicula extends Component {

    constructor() {
        super();
        this.state={
        	pelicula:[]
        }
    }

    componentDidMount() {
    	const id = this.props.match.params.id;
	    fetch(`http://localhost:3001/movies/delete/${id}`,{method: 'GET'})
	      .then(response => response.json())
	      .then(pelicula => this.setState({ pelicula }));
	};

	DestroyPelicula = (event) => {
		const requestOptions = {
	        method: 'POST',
	        headers: { 'Content-Type': 'application/json' },
	        body: JSON.stringify({ 
	        	id: this.state.pelicula.id
	        })
    	};
    	fetch(`http://localhost:3001/movies/delete/${this.state.pelicula.id}`, requestOptions)
        	.then(this.handleRedirect);
  	}

  	handleRedirect = (res) => {
        if( res.status === 200 ){
            // redirect here
            window.location.href = 'http://localhost:3000/lista-peliculas';
        }else {
          // Something went wrong here
        }
    }

    render() {
        return (
            <React.Fragment>
	           	<Navigation></Navigation>
	           	<Container>
		           	<h1>Estas seguro de querer borrar esta película: {this.state.pelicula.title}???</h1>
		           	<span><Button  variant="danger" style={{margin:"5px 5px"}} onClick={this.DestroyPelicula}>Borrar la Película</Button></span>
				    <span><Button href={`/lista-peliculas`} variant="primary" style={{margin:"5px 5px"}}>Listado de Películas</Button></span>
            	</Container>
            </React.Fragment> 
        );
    }
}

export default BorrarPelicula;
