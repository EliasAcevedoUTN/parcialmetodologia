import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Pelicula extends Component {

    constructor() {
        super();
    }

    render() {
    	const imagen = `./images/logo-DH.png`;
        return (
            <React.Fragment>
	            <Row id="card" style={{border:"1px grey solid",margin: "10px 10px"}}>
					<Col md="6">
						<Card.Body>
							<a href={`/detalle-pelicula/${this.props.id}`}><Card.Img variant="top" src={imagen} style={{width:"100px"}} /></a>
					    	<Card.Title>{this.props.titulo}</Card.Title>
					    	<Button href={`/detalle-pelicula/${this.props.id}`} variant="primary">Detalle</Button>
					  	</Card.Body>
					</Col>
				</Row>
			</React.Fragment>
        );
    }
}

export default Pelicula;
