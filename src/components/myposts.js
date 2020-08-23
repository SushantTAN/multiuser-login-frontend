import React, {Component} from 'react';
import axios from 'axios';
import { storage } from '../firebase-config';

import Navbar from './navbar';
import FullScreenDialog from './dialog';



class Myposts extends Component {
    constructor(props) {
        super(props);

        const token =localStorage.getItem("authtoken");
        let loggedin = true;
        if(token == null){
          loggedin =false
        }

        this.state = { 
            fetched: [],
            headers: {
                'auth-token': token
            },

            myposts: [{}],
            selectedpost_id: "" ,
            selectedpost_name: "",

            selecetdimage_url: "",

            loggedin
         }

         this.deletefunc = this.deletefunc.bind(this);
         this.setPost = this.setPost.bind(this);
         this.setModal = this.setModal.bind(this);
        
    }

    componentDidMount(){
        axios.get('http://localhost:9000/api', {headers: this.state.headers})
        .then( res => {
            if(res.data){
                this.setState({
                    fetched: res.data,
                    ownerid: res.data._id
                })
            }
            axios.get('http://localhost:9000/api/myposts/' + this.state.fetched._id )
            .then( res => {
                if(res.data){
                    this.setState({
                        myposts: res.data
                    });
                }
            })
            .catch(err => console.log("error: " + err))
        })
        .catch( err => {console.log('error : ' + err)});
    }


    setPost(c){
        this.setState({
            selectedpost_id: c._id,
            selectedpost_name: c.imageName
        })
    }

    setModal(c){
        this.setState({
            selecetdimage_url: c.imageData
        })
    }

    deletefunc(){
            // Create a reference to the file to delete
        var desertRef = storage.ref('multiuser/').child(this.state.selectedpost_name);

        // Delete the file
        desertRef.delete().then(function() {
            // File deleted successfully
        }).catch(function(error) {
            // Uh-oh, an error occurred!
        });

        axios.delete('http://localhost:9000/api/myposts/delete/' + this.state.selectedpost_id)
            .then(res => {
                console.log(res.data);
                this.setState({
                    myposts: this.state.myposts.filter(el => el._id !== this.state.selectedpost_id)
                })
            })
            .catch(err => console.log("error: " + err));
    }

    render() { 
        return ( 
            <div>
                <Navbar />
                <br/>
                <br/>
                <br/>
                <br/>
                <div className="container">
                 <h3>My Posts</h3>
                <br/>

               

                <div>
                   {
                       this.state.myposts.map( c => {
                    
                           return (
                            <div key={c._id}>
                               <div className="card bg-light mx-auto" style={{width: "35rem", position: "relative"}}>
                                   <h6>&nbsp;{c.ownername} <span style={{position: "absolute", top: "0px", right: "0px"}}>
                                       
                                   <div className="btn-group dropright">
                                    <button onClick={() => {this.setPost(c)}} type="button" className="btn btn-light dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-list" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M2.5 11.5A.5.5 0 0 1 3 11h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 3h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                                        </svg>
                                    </button>
                                    <div className="dropdown-menu">
                                        <button style={{width: "100%"}} className="btn btn-light" onClick={() => {this.deletefunc()}}>
                                            <span>
                                            <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                                <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                            </svg>
                                            </span> Delete post
                                        </button>
                                    </div>
                                    </div>

                                       </span>
                                    </h6>
                                    <p>
                                    &nbsp;
                                    {c.description}
                                    </p>
                                    <p>
                                        <button onClick={() => {this.setModal(c)}} type="button" className="btn btn-light">
                                        {/* {<img alt="img" src={c.imageData} style={{width: "100%"}} />} */}
                                        <FullScreenDialog 
                                            c = {c.imageData}
                                            imageData = {this.state.selecetdimage_url}
                                        />
                                        </button>
                                       
                                    </p>
                               </div>
                                    <br />
                            </div>
                           )
                       })
                   }
                </div>
                </div>

            </div>
         );
    }
}
 
export default Myposts;