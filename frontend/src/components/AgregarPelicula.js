import React, { Component } from 'react';
import Navigation from './Navigation';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { Redirect } from "react-router-dom";

class AgregarPelicula extends Component {
    
    constructor() {
        super();
        this.state={
        	genres: [],
        	title: '',
        	rating: '',
        	awards: '',
        	release_date: '',
        	length: '',
        	genre_id: ''
        };
    }

    mySubmitHandler = (event) => {

		const requestOptions = {
	        method: 'POST',
	        headers: { 'Content-Type': 'application/json' },
	        body: JSON.stringify({ 
	        	title: this.state.title,
	        	rating: this.state.rating,
	        	awards: this.state.awards,
	        	release_date: this.state.release_date,
	        	length: this.state.length,
	        	genre_id: this.state.genre_id
	        })
    	};


    	fetch('http://localhost:3001/movies/create', requestOptions)
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
    componentDidMount() {
	    fetch("http://localhost:3001/genres",{method: 'GET'})
	      .then(response => response.json())
	      .then(genres => this.setState({ genres }));
	};

	titleChanged = (event) => {
    	this.setState({title: event.target.value});
  	}
  	ratingChanged = (event) => {
    	this.setState({rating: event.target.value});
  	}
  	awardsChanged = (event) => {
    	this.setState({awards: event.target.value});
  	}
  	releaseDateChanged = (event) => {
    	this.setState({release_date: event.target.value});
  	}
  	lengthChanged = (event) => {
    	this.setState({length: event.target.value});
  	}
  	genreChanged = (event) => {
    	this.setState({genre_id: event.target.value});
  	}

    render() {
    	const genres = this.state.genres.map((genre,i) => {
    		return (
                <option key={genre.id} value={genre.id}>{genre.name}</option>
            )
    	}) 
        return (
        	<React.Fragment>
	            <Navigation></Navigation>
	            <Container>
		            <Form onSubmit={this.mySubmitHandler}>
						<Form.Group className="mb-3" controlId="formBasicTitle">
						    <Form.Label>Title</Form.Label>
						    <Form.Control type="text" placeholder="Tonari no Totoro" onChange={this.titleChanged} />
					  	</Form.Group>

					  	<Form.Row>
						  	<Col>
							  	<Form.Group className="mb-3" controlId="formBasicRating">
								    <Form.Label>Rating</Form.Label>
								    <Form.Control type="number" placeholder="5" onChange={this.ratingChanged} />
							  	</Form.Group>
							</Col>
							<Col>
							  	<Form.Group className="mb-3" controlId="formBasicAwards">
								    <Form.Label>Awards</Form.Label>
								    <Form.Control type="number" placeholder="2" onChange={this.awardsChanged} />
							  	</Form.Group>
							</Col>
					  	</Form.Row>
						<Form.Group className="mb-3" controlId="formBasicReleaseDate">
						    <Form.Label>Release Date</Form.Label>
						    <Form.Control type="date" onChange={this.releaseDateChanged} />
					  	</Form.Group>

					  	<Form.Group className="mb-3" controlId="formBasicLength">
						    <Form.Label>Length</Form.Label>
						    <Form.Control type="number" placeholder="5" onChange={this.lengthChanged} />
					  	</Form.Group>

					  	<Form.Control as="select" onChange={this.genreChanged}>
						    <option>Select Genre</option>
						    {genres}
						</Form.Control>

					  	<Button variant="success" type="submit" style={{margin:"20px 20px"}}>Agregar</Button>
		            	<Button href={`/listado-peliculas`} variant="primary">Listado de Películas</Button>
					</Form>
				</Container>
			</React.Fragment>
        );
    }
}

export default AgregarPelicula;
