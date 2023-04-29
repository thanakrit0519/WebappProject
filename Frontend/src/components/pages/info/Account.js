import './Account.css'


function Account(){
    return(
     <body>
        <article className='infocontainer'>
            <h1 className='header'>ACCOUNT</h1>
                   
            <div id='choice1'>
                <a href="" >Personal information</a>
                
            </div>
            <div id='choice2'>
                <a href="">ผู้ให้บริการ</a>
            </div>
            <div id='choice3'>
                 <a href="">ผู้ใช้บริการ</a>
            </div>
            <div id='choice4'>
                 <a href="">status</a>
            </div>
            <div id='choice5'>
                <a href="">Log out</a>
            </div>
        
        </article>
        </body>
    )
}

export default Account;