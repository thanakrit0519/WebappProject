import React,{useState} from 'react';
import axios from 'axios';
import {NameLastname,Payment} from "./NameQR";
import './inform.css';
import {Phone,PaymentOption,PaymentNumber,StudentId } from "./SelfData";
import { Link } from 'react-router-dom';

function Inform() {
  const PhotoPart = 'http://localhost:54177/Photos/';
    const d = new Date();
    let time = d.getTime();
    if(localStorage.getItem('deleteTime')!==null){
        if(time-parseInt(localStorage.getItem('deleteTime'))>5000){
          localStorage.setItem('deleteTime',null);
          axios.delete('http://localhost:54177/api/hostList/'+localStorage.getItem('hostOrderId'))
                    .then(function (response){
                      localStorage.setItem('hostOrderId',null);
                      window.alert('Delete Successfully');
                    });
        }
      }
    const [json,setJson] = useState([]);

    var jsonData={
        "studentId": String(localStorage.getItem('token')),
        "firstName": '',
        "lastName": '',
        "phoneNumber": '',
        "paymentBank": '',
        "paymentNumber": '',
        "password": '',
        "userPhotosName":'',
        "paymentPhotosName":'',
        "orderTracking":'',
        "hostOrderId":''
        }

  axios({
    method: "post",
    url: "http://localhost:54177/api/userInfo/getUserInfo",
    headers: { "Content-Type": "application/json" },
    data: JSON.stringify(jsonData)
  }).then(function(response){
    setJson(response.data);
  });
    return(
        <div className="container"> 
            <div className='left-container'>
                <h1>Order</h1>
                <div className='menu-container'>
                    <Link to='/' ><i class="fa-solid fa-user"/></Link>
                    <Link to='/provider' ><i class="fa-solid fa-store"/></Link> 
                    <Link to='/customer' ><i class="fa-solid fa-cart-shopping"/></Link> 
                    <Link to='/status' ><i class="fa-solid fa-list"/></Link>
                    <Link to='/login' ><i class="fa-solid fa-right-from-bracket"/></Link>
                </div>
            </div>
            <div className="information-container right-container">
                <h1 className="head-info">INFORMATION</h1>
                <Link to='/Edit' >  
                    <button  className="EditButton">Edit</button>
                </Link>

                <NameLastname Name={json.firstName} Lastname={json.lastName} photos={PhotoPart+json.userPhotosName}/>
                <Payment photos={PhotoPart+json.paymentPhotosName}/>
                <div className="container-local">
                    <StudentId studentId={json.studentId} />
                    <Phone phone={json.phoneNumber} />
                    <PaymentNumber paymentnumber={json.paymentNumber} />
                    <PaymentOption paymentOption={json.paymentBank} />
                </div>
            </div>
        </div>
        ) 
}

export default Inform;