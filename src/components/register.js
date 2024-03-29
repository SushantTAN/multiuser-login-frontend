import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            name: '',
            email: '',
            password: '',
            registered: false
         }

         this.onC = this.onC.bind(this);
         this.onS = this.onS.bind(this);

        //  this.history = useHistory();
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
        axios.post('https://sleepy-retreat-07400.herokuapp.com/api/user/register', regObj )
            .then((res) => {

                 console.log(res);
                this.setState({
                    registered: true
                });
                // this.history.push('/');
                this.props.history.push("/"); 

            })
            .catch(err => {
                console.log("the error is : " + err);
                alert(err)
            })
    }

    renderPromptToLogin(){
        if(this.state.registered){
            return (
                <div className="form-group">
                    <p className="text-white">Your account has been registered. Goto the <Link to="/">Login page</Link> to sign in </p>
                </div>
            );
        }
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
            <div style={{backgroundImage: `url(http://4.bp.blogspot.com/-FyJuSNsRrWs/TibLzmYFU3I/AAAAAAAAK40/0BGwL0v2eyk/s1600/cool+computer+backgrounds-2.jpg)`, 
        
            
            width: "100vw",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundAttachment: "fixed",
            }}>
            
               <form className="border-dark" onSubmit={this.onS} style={{width: "15rem", marginLeft: "auto", marginRight: "auto", padding: "25vh 0"}}>
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
                    {this.renderPromptToLogin()}
   
                </form>     
                <div style={{height: "100vh"}}> ... </div>
            </div>
        );
    }
}
 
export default Register;