import { useState, useEffect, useContext } from "react";
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {AuthContext} from '../context/AuthContext'
import { logincall } from "../utils/apicalls";
import QrReader from 'react-qr-scanner'
const Login =()=> {

    const [email, setEmail]= useState("");
    const [password, setPassword]= useState("");
    const {user, isFetching, dispatch}= useContext(AuthContext);
    const [qrscandata, setQrscandata]= useState("");
    const [qrlogin, setQrlogin]= useState(false);

    const qrLoginHandler= async (myurl)=>{
      await dispatch({type: "LOGIN_START"});
      try{
          
          const res= await axios.get(myurl);
  
          console.log(res);
         toast("Logged in successfully");
  
         dispatch({type: "LOGIN_SUCCESS", payload: res.data})
         
  
         // now route to the classroom page -> will be done using login context
      }
      catch(err)
      {
          console.log(err);
           toast("Username or Password is not correct");
           dispatch({type: "LOGIN_FAILURE", payload: err});
  
      }
    }

    const handleScan= async (data)=>{
      if(qrscandata != "") return;
        if(data && data.text)
        {
          console.log(data.text);
          const myurl= data.text;
          setQrscandata(myurl);
          await qrLoginHandler(myurl);
        }
         console.log(data);
    }
    const onSubmitHandler= async (e)=>{
      e.preventDefault();
      await dispatch({type: "LOGIN_START"});
    try{
        
      if(!String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )) {toast("Enter a valid email");return;}
      if(password.length < 6) {toast("Password length should be greater than 5"); return;}
        
        const res= await axios.post('https://attend-it-backend.onrender.com/api/auth/login', {
            email: email,
            password: password
        });

        console.log(res);
       toast("Logged in successfully");

     dispatch({type: "LOGIN_SUCCESS", payload: res.data})
       

       // now route to the classroom page -> will be done using login context
    }
    catch(err)
    {
        console.log(err);
         toast("Username or Password is not correct");
         dispatch({type: "LOGIN_FAILURE", payload: err});

    }
    setEmail("");
    setPassword("");

    }

    


    return (
        <>
        
        <div class="container">
        <div class="row justify-content-center align-items-center">
          <form class="row col-12"> 
        <div className="form-group pt-3">
          <label for="exampleInputEmail1">Email address</label>
          <input type="email" value={email} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"  
          onChange={(e)=>{setEmail(e.target.value)}}
          />
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div class="form-group pt-3">
          <label for="exampleInputPassword1">Password</label>
          <input type="password" value={password} className="form-control" id="exampleInputPassword1" placeholder="Password"
          onChange={(e)=>{setPassword(e.target.value)}} />
        </div>
        <div class="form-group pt-3">
        <button type="submit" className="btn" style={{backgroundColor: "darkorange", color:"white", fontWeight:"600"}} onClick={onSubmitHandler}>Submit</button>
        </div>
        </form>
        </div>
        <div className="container" style={{alignContent:"center"}}>
        <hr />
        {!qrlogin && <div style={{textAlign:"center"}}><div className="btn p-2" style={{width:"90%", backgroundColor: "darkorange", color:"white", fontWeight:"600", margin:"0 auto"}} onClick={()=>{setQrlogin(true)}}> LOGIN USING QR </div></div>}
        {qrlogin && <div style={{textAlign:"center" }}><div className="btn p-2" style={{width:"90%", backgroundColor: "#dddddd", color:"white", fontWeight:"600", margin:"0 auto"}} onClick={()=>{setQrlogin(false)}}> HIDE SCANNER </div></div>}
        { qrlogin&&
        <div className="container p-3 m-2" textAlign="center">
        <QrReader
          delay="100"
          onScan={handleScan}
          style={{width: "100%", margin:"auto" , border:"4px solid orange", borderRadius:"30px"}}
          />
        </div>
        }
        </div>
        </div>
       
        </>
    
    );
  }
  
  export default Login;
  