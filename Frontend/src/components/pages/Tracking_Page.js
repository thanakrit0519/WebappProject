import React,{useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Tracking_List from '../Tracking_List';
import './Tracking_Page.css';

function Tracking_Page() {
  const logoutClick=(e)=>{
    localStorage.setItem('token',null);
    window.alert("logout");
  }
  const d = new Date();
  let time = d.getTime();
  if(localStorage.getItem('deleteTime')!==null){
    if(time-parseInt(localStorage.getItem('deleteTime'))>10000){
      
      axios.delete('http://localhost:54177/api/hostList/'+localStorage.getItem('hostOrderId'))
                .then(function (response){
                  localStorage.setItem('deleteTime',null);
                  localStorage.setItem('hostOrderId',null);
                  window.alert('Delete Successfully');
                });
    }
  }
  const [jsonData,setjsonData] = useState([]);
  var getOrder = null;
  
  axios({
      method: "get",
      url: "http://localhost:54177/api/hostList",
  }).then(function (response) {
    //console.log(jsonData);
      setjsonData(response.data);
  }).catch(function(response){
    //console.log(jsonData);
  });

  for(var i=0;i<jsonData.length;i++){
    if(String(jsonData[i].id)===localStorage.getItem('hostOrderId')){
      getOrder=jsonData[i].order;
      break;
    }
   
  }

  var str = String(getOrder).split(",");
  var s="";
  const stopClick=(e)=>{
    s='Delivery..';
    putData();
  }

  const finishClick=(e)=>{
    s='Successfully';
    putData();
  }
  const putData=(e)=>{
    
    var jsonData={
      "id":parseInt(localStorage.getItem('hostOrderId')),
      "restaurant": '',
      "nowNum": 0,
      "maxNum": 0,
      "destination": '',
      "status": s,
      "order":''
    }
    axios({
      method: "put",
      url: "http://localhost:54177/api/hostList",
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify(jsonData)
    })
    .then(function (response) {
      if(response.data==='Put Successfully'){
        if(s==='Successfully'){
          localStorage.setItem('deleteTime',time);
          localStorage.setItem('hostOrderId','');
          window.alert('Finish delivery');
          window.location.replace('http://localhost:3000/provider');
        }
        else{
          window.alert('Stop take orders');
        }
        
      }
      else{
        console.log(response.data);
      }
    });
  }
  return (
    <div className='container'>
    <div className='left-container'>
      <h1>Order List</h1>
      <div className='menu-container'>
        <Link to='/infomation' ><i class="fa-solid fa-user"/></Link>
        <Link to='/provider' ><i class="fa-solid fa-store"/></Link> 
        <Link to='/customer' ><i class="fa-solid fa-cart-shopping"/></Link> 
        <Link to='/status' ><i class="fa-solid fa-list"/></Link>
        <Link to='/' ><i onClick={logoutClick} class="fa-solid fa-right-from-bracket"/></Link>
      </div>
    </div>
      <div className='right-container' style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
        <div className='tracking-container'>
          <table className="table table-striped">
          <tbody>
            {str.map(s=>
            <tr>
              <td><Tracking_List menu={s.split(" ")[0]} amount={s.split(" ")[1]}/></td>
            </tr>
            )}
          </tbody>
          </table>
        </div>
        
        <div className='btn-container' style={{display: 'flex', justifyContent: 'space-between'}}>
          <button value="stop" onClick={stopClick}>Stop take orders</button>
          <button value="finish" onClick={finishClick}>Finish delivery</button>
        </div>  
        </div>
    </div>
  )
}

export default Tracking_Page