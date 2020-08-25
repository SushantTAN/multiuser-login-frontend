import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            name: '',
            email: '',
            password: ''
         }

         this.onC = this.onC.bind(this);
         this.onS = this.onS.bind(this);
    }

    onC(e){
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    onS(e){
        e.preventDefault();
        let regObj = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        }
        axios.post('https://polar-plains-75515.herokuapp.com/api/user/register', regObj )
            .then((res) => {

                 console.log(res);

            })
            .catch(err => {
                console.log("the error is : " + err);
                alert(err)
            })
    }

    renderErrorName(){
        
        if(this.state.name.length < 6 && this.state.name.length !== 0){
            return(
                <small className="text-danger">
                    Name should be atlest 6 letters
                </small>
            )
        }
    }

    renderErrorPassword(){
        
        if(this.state.password.length < 6 && this.state.password.length !== 0){
            return(
                <small className="text-danger">
                    Name should be atlest 6 letters
                </small>
            )
        }
    }


    render() { 
        return ( 
            <div>
            <div  style={{backgroundImage: `url(http://4.bp.blogspot.com/-FyJuSNsRrWs/TibLzmYFU3I/AAAAAAAAK40/0BGwL0v2eyk/s1600/cool+computer+backgrounds-2.jpg)`, 
        
        height: "100vh",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        }}></div>
               <form className="border-dark mx-auto" onSubmit={this.onS} style={{width: "15rem", position: "absolute", top: "10rem", left: "41%"}}>
                    <div className="form-group">
                        <label className="text-white">Username</label>
                        <input className="form-control" id="name" onChange={this.onC}/>
                        {this.renderErrorName()}
                    </div>
                    <div className="form-group">
                        <label className="text-white">Email address</label>
                        <input type="email" className="form-control" id="email" aria-describedby="emailHelp" onChange={this.onC}/>
                        
                        <small id="emailHelp" className="form-text text-light">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label className="text-white">Password</label>
                        <input type="password" className="form-control" id="password" onChange={this.onC}/>
                        {this.renderErrorPassword()}
                    </div>

                    <Link to="/">Already have an account? Log in</Link>
                  
                    <button type="submit" className="btn btn-primary">Submit</button>
   
                </form>     
            
            </div>
        );
    }
}
 
export default Register;