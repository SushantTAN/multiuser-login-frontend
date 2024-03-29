import React, {Component} from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Badge, Fab } from '@material-ui/core';

import Navbar from './navbar';


class FindFriends extends Component {
    constructor(props) {
        super(props);

        const token =localStorage.getItem("authtoken");
        let loggedin = true;
        if(token == null){
          loggedin =false
        }

        this.state = { 
            users: [],
            following: [],
            followers: [],

            searchbar: "",
            filtered: [],
            loggedin
         }

         //this.search = this.search.bind(this);
         this.setSearch = this.setSearch.bind(this);
    }

setSearch(e){
    e.preventDefault();
    this.setState({
        searchbar: e.target.value 
    });

    console.log(this.state.searchbar);
    
    var myreg = new RegExp(this.state.searchbar, "i")
        
        this.setState({
            filtered: []
        })
  
            this.setState({
                filtered: this.state.users.filter(el => myreg.test(el.name) === true)
            })

        if(e.target.value === null){
            this.setState({
                filtered: []
            })
        }
}

follow(c){
    let followObj = {from:  localStorage.getItem("loggeduser"), to: c._id}
    axios.post('https://sleepy-retreat-07400.herokuapp.com/api/user/follow', followObj)
        .then(
            axios.post('https://sleepy-retreat-07400.herokuapp.com/api/user/following', followObj)
                .then(() => {
                    console.log("followed");
                    
                    axios.get('https://sleepy-retreat-07400.herokuapp.com/api/user/loggeduser/' + localStorage.getItem("loggeduser"))
                        .then(res => {
                            if(res.data){
                                this.setState({
                                    following: res.data.following
                                })
                            
                            }
                        })
                        .catch(err => console.log(err))

                })
                .catch(err => console.log(err))
        )
        .catch(err => console.log(err))
}

unfollow(c){
    let followObj = {from:  localStorage.getItem("loggeduser"), to: c._id}
    axios.post('https://sleepy-retreat-07400.herokuapp.com/api/user/unfollowing', followObj)
        .then(
            axios.post('https://sleepy-retreat-07400.herokuapp.com/api/user/unfollow', followObj)
                .then(() => {
                    console.log("unfollowed");

                    axios.get('https://sleepy-retreat-07400.herokuapp.com/api/user/loggeduser/' + localStorage.getItem("loggeduser"))
                        .then(res => {
                            if(res.data){
                                this.setState({
                                    following: res.data.following
                                })
                            
                            }
                        })
                        .catch(err => console.log(err))

                })
                .catch(err => console.log(err))
        )
        .catch(err => console.log(err))
}

renderButton(c){
    let i = 0;
    let condition = "";
    for(i=0; i < this.state.following.length; i++){
        if(this.state.following[i] === c._id){
            condition="following"
        }
    }

    if(condition === "following"){
        return(
            <button className="btn btn-warning" onClick={() => {this.unfollow(c)}}>Unfollow</button>
        )
    }
    else{
        return(
            <button className="btn btn-success" onClick={() => {this.follow(c)}}>follow</button>
        )
    }
    
}

componentDidMount(){
    axios.get('https://sleepy-retreat-07400.herokuapp.com/api/user/allusers')
        .then(res => {
            if(res.data){
            this.setState({
                users: res.data
            })
            }
        })
        .catch(err => console.log(err));

        axios.get('https://sleepy-retreat-07400.herokuapp.com/api/user/loggeduser/' + localStorage.getItem("loggeduser"))
        .then(res => {
            if(res.data){
                this.setState({
                    following: res.data.following,
                    followers: res.data.followers
                })
            
            }
        })
        .catch(err => console.log(err))
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
                <br/>
                <br/>
                <br/>

                <div className="container">
                    <table className="container">
                        <tr>
                            <td>
                                <Badge badgeContent={this.state.followers.length} color="primary">
                                <a data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                                    <Fab variant="extended" color="secondary" aria-label="add">
                                        Followers
                                    </Fab>
                                </a>     
                                </Badge>
                            </td>
                            <td>
                                <Badge badgeContent={this.state.following.length} color="secondary">
                                <a data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                                    <Fab variant="extended" color="primary" aria-label="add">
                                        Following
                                    </Fab>
                                </a> 
                                </Badge>
                            </td>
                        </tr>
                       
                        
                    </table>
                   
                </div>

                <h4>Find Friends</h4>

                <div className="container ">
                    <input type="text" placeholder="search friends" onChange={this.setSearch} />

                    <div>
                    {
                        this.state.filtered.map(c => {
                            return(
                            <div className="card bg-light" style={{width: "40rem"}}>&nbsp;
                            <table>
                            <tr>
                                <td>{c.name}</td>
                                <td className="email">{c.email}</td>
                                <td>{this.renderButton(c)}</td>
                                
                            </tr>
                            </table>
                            
                            </div>
                            )
                        })
                    }<br/>
                </div>
                </div>

                <div>
                    <h4>All Members</h4>
                <table className="table container">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col" className="email">Email</th>
                            <th scope="col">Befriend</th>
                        </tr>
                    </thead>
                    <tbody>
                       {
                           this.state.users.filter(el => el._id !== localStorage.getItem("loggeduser")).map(c => {
                               return(
                                   
                                       <tr>
                                        <td>{c.name}</td>
                                        <td className="email">{c.email}</td>
                                        <td>{this.renderButton(c)}</td>
                                       </tr>
                                   
                               )
                           })
                       }
                    </tbody>
                    </table>
                </div>

                <div style={{height: "100vh"}}> ... </div>
            </div>
         );
    }
}
 
export default FindFriends;