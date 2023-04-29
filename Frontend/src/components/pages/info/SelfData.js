import { Component } from "react";
import './SelfData.css'

  class UserName extends Component{
    render(){
        return(
        <div className="container-data">
            <div className="container-usn">
              <legend>User Name</legend>
                <div  className="boxname-usn">
                  <p>{this.props.Username}</p>
                </div>
              </div>
        </div>
        );
    };
};

class Nickname extends Component{
    render(){
        
        return(
         <div className="container-data">
            <div className="container-nn">
                <legend>Nickname</legend>
                <div  className="boxname-usn">
                    <p>{this.props.nickname}</p>
                </div>
            </div>
        </div>
        );
    };
};

class StudentId extends Component{
    render(){
        
        return(
            <div className="container-data">
            <div  className="container-si">
            <legend>Student Id</legend>
            <div  className="boxname-usn">
                <p>{this.props.studentId}</p>
              </div>
            </div>
            </div>

    
    
        );
    };

};

class   Phone extends Component{
    render(){
        
        return(
            <div className="container-data">
            <div  className="container-ph">
            <legend>Phone</legend>
            <div  className="boxname-usn">
                <p>{this.props.phone}</p>
              </div>
            </div>
            </div>
        );
    };
};

class PaymentOption extends Component{
    render(){
        
        return(
            <div className="container-data">
            <div  className="container-po">
            <legend>PaymentOption</legend>
            <div  className="boxname-usn">
                <p>{this.props.paymentOption}</p>
              </div>
            </div>
            </div>
    
    
        );
    };
};

class PaymentNumber extends Component{
    render(){
        return(
            <div className="container-data">
            <div  className="container-pm">
            <legend>PaymentNumber</legend>
            <div  className="boxname-usn">
                <p>{this.props.paymentnumber}</p>
              </div>
            </div>
            </div>

    
        );
    };
};

export {UserName,Nickname,Phone,PaymentOption,PaymentNumber,StudentId}