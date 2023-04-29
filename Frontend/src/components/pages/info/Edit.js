import React , {useState}from 'react';
import axios from 'axios';
import './inform.css';
import './Edit.css';
import  { Link } from 'react-router-dom';
function Edit() {
    const [PhotoFileName1,setPhotoFileName1] = useState('anonymous.png');
    const [PhotoFileName2,setPhotoFileName2] = useState('anonymous.png');
    const [id,setId] = useState('');
    const [fname,setFname] = useState('');
    const [lname,setLname] = useState('');
	const [phone,setPhone] = useState('');
    const [paymentBank,setPaymentBank] = useState('');
    const [paymentNumber,setPaymentNumber] = useState('');

    const PhotoPart = 'http://localhost:54177/Photos/';
    const formData=new FormData();

    const uploadPic=(e,type)=>{
        
        var fileName=String(e.name);
        var photoName;
        if (type==='user'){
            photoName=localStorage.getItem('token')+'-user';
        }
        else{
            photoName=localStorage.getItem('token')+'-QRcode';
        }
        for(var i=fileName.length -1;i>0;i--){
            if(fileName[i]==='.'){
                photoName += fileName.substring(i);
                break;
            }
        }
        
        formData.append("file",e,photoName);

        axios.post("http://localhost:54177/api/userInfo/savefile/",formData,{headers: { 'Content-Type': 'multipart/form-data' },})
                .then(function (response) {
                if(type==="user"){
                    setPhotoFileName1(response.data);
                }
                else{
                    setPhotoFileName2(response.data);
                }
                    console.log(response.data);
                    if(response.data!=="anonymous.png")
                        {
                            window.alert('Upload success')
                        }
                        else
                        {
                            window.alert('Upload fail')
                        }
                    }).catch(function (response) {
                        console.log("response");
                    });
        }
    console.log(PhotoFileName1);
	const handleSubmit=(e)=>{
    
		e.preventDefault();
        var jsonData={
            "studentId": id,
            "firstName": fname,
            "lastName": lname,
            "phoneNumber": phone,
            "paymentBank": paymentBank,
            "paymentNumber": paymentNumber,
            "password": '',
            "userPhotosName":PhotoFileName1,
            "paymentPhotosName":PhotoFileName2,
            "orderTracking":'',
            "hostOrderId":''
            }

        axios({
        method: "put",
        url: "http://localhost:54177/api/userInfo",
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify(jsonData)
        })
        .then(function (response) {
        //handle success
            if(response.data==='Put Successfully')
            {
            window.alert('Edit success');
            window.location.replace('http://localhost:3000/information');
            }
            else
            {
            window.alert('Edit Fail1');
            }
            console.log(response);
        }).catch(function (response) {
            //handle error
            window.alert('Edit Fail2');
            console.log(response.data);
        });           
	}
    
    return(
        
        <div className="information-container">
            <h1 className="head-info">INFORMATION</h1>
            <Link to='/information' >  
                    <button className="CancelButton">Cancel</button>
            </Link>
            
            
           <div className="profile-container">
                <img className="profilePic" alt="" src={PhotoPart+PhotoFileName1}></img>
                <input value={fname} onChange={(e)=>setFname(e.target.value)} placeholder="Enter Firstname" name="fname"></input>
                <input value={lname} onChange={(e)=>setLname(e.target.value)} placeholder="Enter Lastname" name="lname"></input>
                <input  type='file' onChange={(e)=>uploadPic(e.target.files[0],'user')} ></input>
           </div>

           <div className="payment-container">
                <img className="QR" alt="" src={PhotoPart+PhotoFileName2}></img>
                <h2>QR payment</h2>
                <input  type='file' onChange={(e)=>uploadPic(e.target.files[0],'QRcode')} ></input>
           </div>

           <div className="container-local">
                <div className="Edit-data">
                    <legend>Student Id</legend>
                    <input type="number" placeholder='Enter Student_ID' value={id} onChange={(e)=>setId(e.target.value)} name="id"></input>
                </div>
                <div className="Edit-data">
                    <legend>Phone</legend>
                    <input type="number" placeholder='Enter Phone' value={phone} onChange={(e)=>setPhone(e.target.value)} name="phone"></input>
                </div>
                <div className="Edit-data">
                    <legend>PaymentNumber</legend>
                    <input type="number" placeholder='Enter Payment Number' value={paymentNumber} onChange={(e)=>setPaymentNumber(e.target.value)} name="paymentNumber"></input>
                </div>
                <div className="Edit-data">
                    <legend>PaymentBank</legend>
                    <input type="text" placeholder='Enter Payment Bank' value={paymentBank} onChange={(e)=>setPaymentBank(e.target.value)} name="paymentBank"></input>
                </div> 
           </div>
            <button onClick={handleSubmit} className="SaveButton">Save</button>
        </div>
        )
}

export default Edit;