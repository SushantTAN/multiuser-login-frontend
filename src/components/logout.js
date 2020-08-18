import React, { Component } from 'react';
import {  Redirect } from 'react-router-dom';



class Logout extends Component {
    constructor(props) {
        super(props);
        localStorage.removeItem("authtoken");
        localStorage.removeItem("loggeduser");
        this.state = { 
            
         }
    }
    render() { 
        return ( 
        <div>
            <Redirect to="/" />
        </div> 
        );
    }
}
 
export default Logout;