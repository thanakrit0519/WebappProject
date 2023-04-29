import React,{useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Status_List from '../Status_List';

function Status_Page() {
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
  var jsonData1={
    "id":null,
    "restaurant": null,
    "nowNum": null,
    "maxNum": null,
    "destination": null,
    "status": null,
    "order":null
  }
  var showData = [[jsonData1,"null null"]];
  var haveOrderNow = [];
  if(localStorage.getItem('haveOrder')!==null){
    showData.pop();
    var haveOrderId=localStorage.getItem('haveOrder').split(",");
    var j=0;
    var showOrder=localStorage.getItem('order').split(",");
    for(var j=0;j<haveOrderId.length;j++){
      for(var i=0;i<jsonData.length;i++){
        if(String(jsonData[i].id)===haveOrderId[j]){
          showData.push([jsonData[i],showOrder[j]]);
          haveOrderNow.push(haveOrderId[j]);
          break;
        }
      }
  }
  //console.log(showData);
  

  // var updateHaveOrder = "";
  // for(var i=0;i<haveOrderNow.length;i++){
  //   updateHaveOrder += haveOrderNow[i];
  //   if(i<haveOrderNow.length-1){
  //     updateHaveOrder += ",";
  //   }
  // }
  // localStorage.setItem('haveOrder',updateHaveOrder);
  
}
  return (
    <div className='container'>
    <div className='left-container'>
      <h1>Status</h1>
      <div className='menu-container'>
        <Link to='/infomation' ><i class="fa-solid fa-user"/></Link>
        <Link to='/provider' ><i class="fa-solid fa-store"/></Link> 
        <Link to='/customer' ><i class="fa-solid fa-cart-shopping"/></Link> 
        <Link to='/status' ><i class="fa-solid fa-list"/></Link>
        <Link to='/' ><i onClick={logoutClick} class="fa-solid fa-right-from-bracket"/></Link>
      </div>
    </div>
      <div className='right-container'>
        {/* <Status_List location='KFC' pickup='ECC' btn='Delivery..' />
        <Status_List location='MK' pickup='KMITL' btn='Can order' />
        <Status_List location='MK' pickup='HOME' btn='Successfully' /> */}

        <table >
          <tbody>
            {showData.map(data=>
            <tr>
              <td><Status_List location={data[0].restaurant} pickup={data[0].destination} btn={data[0].status} menu={data[1].split(" ")[0]} amount={data[1].split(" ")[1]}/></td>
            </tr>
            )}
          </tbody>
      </table>
      </div>
    </div>
  )
}

export default Status_Page