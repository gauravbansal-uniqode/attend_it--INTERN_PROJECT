import Login from "./Login";
import Register from "./Register"
import { useState } from "react";
import './Auth.css'
import { ToastContainer, toast } from 'react-toastify';
const Auth =()=> {

    let [login, setLogin]= useState(true);

    return (
        <>
      <div className="container-fluid " style={{"min-height": "100vh"}}>
       
      <div className="row" style={{"min-height": "100vh"}}>
        <div className="col-7 p-2" style={{textAlign:"center"}}>
        <img src="/collage4.png" class="img-fluid" style={{width:"98%", opacity:"90%", height:"100vh"}}/>
        </div>
        <div className="col-5 bg-light p-6">
        <div className= "row p-3 p-5 mb-5 lead"><p className="h1 heading">attend_it</p></div>
        <div className="row mx-5">
        <div onClick={()=>{setLogin(true)}} className={'h4 col ' + (login && 'selected')}>Login</div>
        <div  onClick={()=>{setLogin(false)}} className={'h4 col ' +( !login && 'selected')}>Register</div>
        </div>
        <div className="row bg-white py-5 m-3">
        {
            
            login ? 
            <div>
            <Login /> 
            
            </div>
            : <Register />

        }
        </div>
        
        </div>
        </div>
      </div>
      <div>
        <ToastContainer
        position="top-center"
        autoClose={10000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover/>
        </div>
      </>
    );
  }
  
  export default Auth;
  