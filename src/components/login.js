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
        axios.post('http://localhost:9000/api/user/login', userObj )
            .then((res) => {
                 console.log(res.data);

                 localStorage.setItem("authtoken", res.data);
                 this.setState({
                     loggedin: true 
                 })

            })
            .catch(err => {
                console.log("the error is : " + err);
            })
    }

    render() { 
        if(this.state.loggedin){
            return <Redirect to="/auth"/> 
        }

        return ( 
        <div>
            <form className="border-dark" onSubmit={this.onS} style={{width: "15rem", position: "absolute", top: "10rem", left: "41%"}}>
                <div className="form-group">
                    <label >Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={this.onC}/>
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label >Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" onChange={this.onC}/>
                </div>
                <Link to="/register" >Register for free</Link> <br />
                <button type="submit" className="btn btn-primary">Submit</button>
   
            </form>
        </div> );
    }
}
 
export default Login;