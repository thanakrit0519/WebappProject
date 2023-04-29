import React,{useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Order_Page() {
  const logoutClick=(e)=>{
    localStorage.setItem('token',null);
    window.alert("logout");
  }
  const d = new Date();
  let time = d.getTime();
  if(localStorage.getItem('deleteTime')!==null){
    if(time-parseInt(localStorage.getItem('deleteTime'))>10000){
      localStorage.setItem('deleteTime',null);
      axios.delete('http://localhost:54177/api/hostList/'+localStorage.getItem('hostOrderId'))
                .then(function (response){
                  localStorage.setItem('hostOrderId',null);
                  window.alert('Delete Successfully');
                });
    }
  }
  const [amount,setAmount] = useState(0);
  const [menu,setMenu] = useState('');

  const handleSubmit=(e)=>{
		e.preventDefault();
    
    var jsonData={
      "id":parseInt(localStorage.getItem('orderId')),
      "restaurant": '',
      "nowNum": amount,
      "maxNum": 0,
      "destination": '',
      "status": '',
      "order":menu+' '+amount
    }

    axios({
      method: "put",
      url: "http://localhost:54177/api/hostList",
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify(jsonData)
    })
    .then(function (response) {
      if(response.data==='Put Successfully'){
        window.alert('Put Successfully');
        
        if(localStorage.getItem('haveOrder')===""){
          localStorage.setItem('haveOrder',localStorage.getItem('orderId'));
          localStorage.setItem('order',menu+' '+amount);
        }
        else{
          localStorage.setItem('haveOrder',localStorage.getItem('haveOrder')+','+localStorage.getItem('orderId'));
          localStorage.setItem('order',localStorage.getItem('order')+','+menu+' '+amount);
        }
        
      window.location.replace('http://localhost:3000/status');
      }
      else{
        window.alert(response.data);
      }
    });
  }
  return (
    <div className='container'>
        <div className='left-container'>
          <h1>Order</h1>
          <div className='menu-container'>
            <Link to='/' ><i class="fa-solid fa-user"/></Link>
            <Link to='/provider' ><i class="fa-solid fa-store"/></Link> 
            <Link to='/customer' ><i class="fa-solid fa-cart-shopping"/></Link> 
            <Link to='/status' ><i class="fa-solid fa-list"/></Link>
            <Link to='/' ><i onClick={logoutClick} class="fa-solid fa-right-from-bracket"/></Link>
          </div>
        </div>
        <div className='right-container' style={{justifyContent: 'center'}}>
          <h2 >Menu name</h2>
          <input value={menu} type="text" style={{width: '580px', height: '50px'}} onChange={(e)=>setMenu(e.target.value)}></input>
          <h2>Amount</h2>
          <input value={amount} type='number' placeholder="Enter your amount" onChange={(e)=>setAmount(e.target.value)} min="0" max="10"/>

          <button onClick={handleSubmit}>Order</button>
        </div>
    </div>
  )
}

export default Order_Page