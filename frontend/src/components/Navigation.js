import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';

class Navigation extends Component {
    render() {
    	const styleImage = {
    		width: '200px',
    		borderRadius: '100px'
    	};
        return (
            <React.Fragment>
            	<Navbar bg="primary" variant="dark">
            		<img src="../images/logo-DH.png" alt="" style={styleImage}/>
				    <Nav className="mr-auto">
				      <Nav.Link href="/">Home</Nav.Link>
				      <Nav.Link href="/lista-peliculas">Lista de Peliculas</Nav.Link>
				    </Nav>
				    <Form inline>
				      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
				      <Button variant="outline-info">Search</Button>
				    </Form>
				 </Navbar>
            </React.Fragment>
        );
    }
}

export default Navigation;
