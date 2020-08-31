import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { storage } from '../firebase-config';

import Navbar from './navbar';
import FullScreenDialog from './dialog';

class Auth extends Component {
    constructor(props) {
        super(props);

        const token =localStorage.getItem("authtoken");
        let loggedin = true;
        if(token == null){
          loggedin =false
        }

        this.state = { 
            caption: '',
            uploading: '',

            newsfeed: [],
            following: [],

            selecetdimage_url: "",
            

            fetched: [],
            
            headers: {
                'auth-token': token
            },
            loggedin
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
        this.setState({
            uploading: "yes"
        })

        let currentImageName = "firebase-image-" + Date.now();
        let uploadImage = storage.ref(`multiuser/${currentImageName}`).put(e.target.pic.files[0]);
  
        uploadImage.on('state_changed',
          (snapshot) => { },
          (error) => {alert(error);},
          () => 
            storage.ref('multiuser').child(currentImageName).getDownloadURL().then(url => {
              this.setState({
                firebaseImage: url,
                
              });

            

            let regObj = {
            description: this.state.caption,
            ownerid: this.state.fetched._id,
            ownername: this.state.fetched.name,
            imageName: currentImageName,
            imageData: url
            }

            axios.post('https://polar-plains-75515.herokuapp.com/api/update/' + this.state.fetched._id, regObj )
                .then((res) => {
                    
                    console.log(res);
                    this.setState({
                        uploading: "no"
                    })
                    

                })
                .catch(err => {
                    console.log("the error is : " + err);
                })

            

            })
            )
      
    }

    renderLoading(){
        if(this.state.uploading === "yes"){
            return <span className="mx-auto">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>Uploading your post
            </span>
        }
    }

    setModal(c){
        this.setState({
            selecetdimage_url: c.imageData
        })
    }

    componentDidMount(){
        axios.get('https://polar-plains-75515.herokuapp.com/api', {headers: this.state.headers})
            .then( res => {
                if(res.data){
                    this.setState({
                        fetched: res.data
                    
                    })
                    localStorage.setItem("loggeduser", this.state.fetched._id );
                    
                }

                axios.get('https://polar-plains-75515.herokuapp.com/api/user/loggeduser/' + this.state.fetched._id)
                    .then(res => {
                        if(res.data){
                            this.setState({
                                following: res.data.following
                            })
                        }
                        

                        let arrayObj = {myfollowing: this.state.following.map(c => c)};
                        
                        axios.post('https://polar-plains-75515.herokuapp.com/api/newsfeed', arrayObj)
                            .then(res => {
                                if(res.data){
                                    this.setState({
                                        newsfeed: res.data
                                    })
                                }console.log(res.data)
                                
                            })
                            .catch(err => console.log('error: ' + err))
                    }).catch(err => console.log(err))
                
               
            })
            .catch( err => {console.log('error : ' + err)})
    }

   
    render() { 
        if(this.state.loggedin === false){
            return <Redirect to="/" />
        }
        return ( 
            <div style={{backgroundImage: `url(https://i.ytimg.com/vi/I9RbClQ_2Wg/maxresdefault.jpg)`, 
        
            width: "100vw",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundAttachment: "fixed",
            }}>
                
                <Navbar />
                <div  className="container">
               <div className="container-fluid" style={{top: "2rem"}}>
               <br />
               <br />
               <br />
                <h1 className="text-center" style={{fontFamily: "Comic Sans MS"}}>HI {this.state.fetched.name}</h1>
                

                <div>
                    <h3>Create a post</h3>
                    <form className="border-dark mx-auto card bg-light" onSubmit={this.onS} style={{width: "30rem"}}>
                    <div className="form-group">
                        <label >&nbsp;Describe your post( enter a caption an also select an image )</label>
                        <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Caption</span>
                        </div>
                        <textarea className="form-control" aria-label="With textarea" id="caption" onChange={this.onC}></textarea>
                        </div><br />

                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="inputGroupFileAddon01">Upload</span>
                            </div>
                            <div className="custom-file">
                                <input name="pic" type="file" className="custom-file-input" id="photo" aria-describedby="inputGroupFileAddon01"/>
                                <label className="custom-file-label" htmlFor="photo">Choose file</label>
                            </div>
                        </div>
                    </div>
                  
                    <button type="submit" className="btn btn-primary">Post</button>
                    {
                        this.renderLoading()
                    }
                </form> 
                
                </div>
                <br />
                    <div>
                        <h3>News Feed</h3>
                        <div>
                          {
                              this.state.newsfeed.map(c => {
                                  return (
                                    <div>
                                        <div className="card bg-light mx-auto" style={{width: "35rem", position: "relative"}}>
                                            <h6>&nbsp;{c.ownername}</h6>
                                            <p>&nbsp;{c.description}</p>
                                            <button onClick={() => {this.setModal(c)}} type="button" className="btn btn-light">
                                                <FullScreenDialog 
                                                    c = {c.imageData}
                                                    imageData = {this.state.selecetdimage_url}
                                                />
                                            </button>
                                        </div>
                                        <br />
                                    </div>
                                  )
                              }) 
                            
                          }
                        </div>

                        

                    </div>
                    
                </div>
                </div>
                <div style={{height: "100vh"}}> ... </div>
            </div>
        );
    }
}
 
export default Auth;