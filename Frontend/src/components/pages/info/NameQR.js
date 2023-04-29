import { Component } from "react";
import './NameQR.css';
class NameLastname extends Component{
    render(){
        return(
            <div className="profile-container">
                <img class="profilePic" alt="" src={this.props.photos}></img>
                <h2>{this.props.Name}       {this.props.Lastname}</h2>
            </div>
           

        );
    }
}

class Payment extends Component{
    render(){
        return(
            <div class = "payment-container">
                <img class="QR" alt="" src={this.props.photos}></img>
                <h2>QR payment</h2>
            </div>
        );
    }
}

export  {NameLastname,Payment};


    