import React, { Component } from 'react';
import Navigation from './Navigation';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { Redirect } from "react-router-dom";

class ActualizarPelicula extends Component {
    
    constructor() {
        super();
        this.state={
        	genres: [],
        	pelicula: [],
        	title: '',
        	rating: '',
        	awards: '',
        	release_date: '',
        	length: '',
        	genre_id: ''
        };
    }

    mySubmitHandler = (event) => {
    	event.preventDefault();
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

    	fetch(`http://localhost:3001/movies/update/${this.state.pelicula.id}`, requestOptions)
        	.then(this.handleRedirect);  
  	}

  	handleRedirect = (res) => {
  		console.log(res);
        if( res.status === 200 ){
            // redirect here
            window.location.href = 'http://localhost:3000/lista-peliculas';
        }else {
          // Something went wrong here
        }
    }
    componentDidMount() {
    	const id = this.props.match.params.id;

	    fetch("http://localhost:3001/genres",{method: 'GET'})
	      .then(response => response.json())
	      .then(genres => this.setState({ genres }));

	    fetch(`http://localhost:3001/movies/edit/${id}`,{method: 'GET'})
	      .then(response => response.json())
	      .then(pelicula => {
	      	this.setState({ pelicula });
	      	this.setState({title: pelicula.title});
	      	this.setState({rating: pelicula.rating});
	      	this.setState({awards: pelicula.awards});
	      	this.setState({release_date: pelicula.release_date});
	      	this.setState({length: pelicula.length});
	      	this.setState({genre_id: pelicula.genre_id});
	      });

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
						    <Form.Control type="text" placeholder="Tonari no Totoro" onChange={this.titleChanged} value={this.state.title}/>
					  	</Form.Group>

					  	<Form.Row>
						  	<Col>
							  	<Form.Group className="mb-3" controlId="formBasicRating">
								    <Form.Label>Rating</Form.Label>
								    <Form.Control type="number" placeholder="5" onChange={this.ratingChanged} value={this.state.rating} />
							  	</Form.Group>
							</Col>
							<Col>
							  	<Form.Group className="mb-3" controlId="formBasicAwards">
								    <Form.Label>Awards</Form.Label>
								    <Form.Control type="number" placeholder="2" onChange={this.awardsChanged} value={this.state.awards}/>
							  	</Form.Group>
							</Col>
					  	</Form.Row>
						<Form.Group className="mb-3" controlId="formBasicReleaseDate">
						    <Form.Label>Release Date</Form.Label>
						    <Form.Control type="date" onChange={this.releaseDateChanged} value={this.state.release_date}/>
					  	</Form.Group>

					  	<Form.Group className="mb-3" controlId="formBasicLength">
						    <Form.Label>Length</Form.Label>
						    <Form.Control type="number" placeholder="5" onChange={this.lengthChanged} value={this.state.length}/>
					  	</Form.Group>

					  	<Form.Control as="select" onChange={this.genreChanged} value={this.state.genre_id}>
						    <option>Select Genre</option>
						    {genres}
						</Form.Control>

					  	<Button variant="success" type="submit" style={{margin:"20px 20px"}}>Actualizar</Button>
		            	<Button href={`/listado-peliculas`} variant="primary">Listado de Películas</Button>
					</Form>
				</Container>
			</React.Fragment>
        );
    }
}

export default ActualizarPelicula;
