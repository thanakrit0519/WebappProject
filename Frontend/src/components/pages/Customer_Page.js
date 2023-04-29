import React,{useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Customer from '../Customer_List';


function Customer_Page() {
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
  const [jsonData,setjsonData] = useState([]);
  
  axios({
      method: "get",
      url: "http://localhost:54177/api/hostList",
  }).then(function (response) {
    //console.log(jsonData);
      setjsonData(response.data);
  }).catch(function(response){
    //console.log(jsonData);
  });

  return (
    <div className='container'>
    <div className='left-container'>
      <h1>Customer</h1>
      <div className='menu-container'>
        <Link to='/infomation' ><i class="fa-solid fa-user"/></Link>
        <Link to='/provider' ><i class="fa-solid fa-store"/></Link> 
        <Link to='/customer' ><i class="fa-solid fa-cart-shopping"/></Link> 
        <Link to='/status' ><i class="fa-solid fa-list"/></Link>
        <Link to='/' ><i onClick={logoutClick} class="fa-solid fa-right-from-bracket"/></Link>
      </div>
  </div >
     <div className='right-container'>
      <table>
          <tbody>
            {jsonData.map(json=>
            <tr>
              <td><Customer location={json.restaurant} total_amount={json.maxNum} booked_amount={json.nowNum} pickup={json.destination} btn="Order" id={json.id}/></td>
            </tr>
            )}
          </tbody>
      </table>
    </div>
  </div>
  )
}

export default Customer_Page