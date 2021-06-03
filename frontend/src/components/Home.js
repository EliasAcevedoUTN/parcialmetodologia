import React, { Component } from 'react';
import Navigation from './Navigation';

class Home extends Component {
    constructor() {
        super();
    }

    render() {
        return (
        	<React.Fragment>
        		<Navigation></Navigation>
        	</React.Fragment>
            
        );
    }
}

export default Home;
