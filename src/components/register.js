import React, {Component} from 'react';
import axios from 'axios';

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
        axios.post('http://localhost:9000/api/user/register', regObj )
            .then((res) => {

                 console.log(res);

            })
            .catch(err => {
                console.log("the error is : " + err);
            })
    }

    render() { 
        return ( 
            <div>
               <form className="border-dark mx-auto" onSubmit={this.onS} style={{width: "15rem", position: "absolute", top: "10rem", left: "41%"}}>
                    <div className="form-group">
                        <label >Username</label>
                        <input className="form-control" id="name" onChange={this.onC}/>
                    </div>
                    <div className="form-group">
                        <label >Email address</label>
                        <input type="email" className="form-control" id="email" aria-describedby="emailHelp" onChange={this.onC}/>
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label >Password</label>
                        <input type="password" className="form-control" id="password" onChange={this.onC}/>
                    </div>
                  
                    <button type="submit" className="btn btn-primary">Submit</button>
   
                </form>     
            </div>
        );
    }
}
 
export default Register;