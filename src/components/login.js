import React, {Component} from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';

class Login extends Component {
    constructor(props) {
        super(props);

        const token =localStorage.getItem("authtoken");
        let loggedin = true;
        if(token == null){
            loggedin =false
        }

        this.state = { 
            exampleInputEmail1: '',
            exampleInputPassword1: '',
            user: '',
            loggedin
        }

        this.onS = this.onS.bind(this);
        this.onC = this.onC.bind(this);
    }

    onC(e){
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    onS(e){
        e.preventDefault();
        let userObj = {
            email: this.state.exampleInputEmail1,
            password: this.state.exampleInputPassword1
        }
        axios.post('https://polar-plains-75515.herokuapp.com/api/user/login', userObj )
            .then((res) => {
                 console.log(res.data);

                 localStorage.setItem("authtoken", res.data);
                 this.setState({
                     loggedin: true 
                 })

            })
            .catch(err => {
                console.log("the error is : " + err);
                alert(err + " Incorrect email or password");
            })
    }

    renderErrorPassword(){
        
        if(this.state.exampleInputPassword1.length < 6 && this.state.exampleInputPassword1.length !== 0){
            return(
                <small className="text-danger">
                    Name should be atlest 6 letters
                </small>
            )
        }
    }

    render() { 
        if(this.state.loggedin){
            return <Redirect to="/auth"/> 
        }

        return ( 
        <div >
            <div style={{backgroundImage: `url(http://4.bp.blogspot.com/-FyJuSNsRrWs/TibLzmYFU3I/AAAAAAAAK40/0BGwL0v2eyk/s1600/cool+computer+backgrounds-2.jpg)`, 
        
        height: "100vh",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        }}> </div>
            <div >
            <form className="border-dark" onSubmit={this.onS} style={{width: "15rem", position: "absolute", top: "10rem", left: "40%"}}>
                <div className="form-group">
                    <label className="text-white">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={this.onC}/>
                    <small id="emailHelp" className="form-text text-light">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label className="text-white">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" onChange={this.onC}/>
                    {this.renderErrorPassword()}
                </div>
                <Link to="/register" >Register for free</Link> <br />
                <button type="submit" className="btn btn-primary">Submit</button>
   
            </form>
            </div>
        </div> );
    }
}
 
export default Login;