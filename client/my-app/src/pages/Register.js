import { useState, useEffect } from "react";
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClipLoader from "react-spinners/ClipLoader";
import {Spin} from 'antd'

const Register =()=> {

    let [name, setName]= useState("");
    let [email, setEmail]= useState("");
    let [password, setPassword]= useState("");
    let [qrimg, setQrimg]= useState("");
    let [loading,setLoading]= useState(false);

    let axiosConfig = {
      headers:{
        'Authorization': 'Token 57c4d555b72e48bc12921ae87c96b2977018ba16', 
        'Content-Type': 'application/json'
      }
    };

    const onSubmitHandler= async (e)=>{
       
        try{
            e.preventDefault();
            if(name.length < 6) {toast("Name length should be greater than 5"); return;}
            if(!String(email)
            .toLowerCase()
            .match(
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )) {toast("Enter a valid email");return;}
            if(password.length < 6) {toast("Password length should be greater than 5"); return;}


            const res= await axios.post('https://attend-it-backend.onrender.com/api/auth/register', {
                teachername: name,
                email: email,
                password: password
            });
    
            console.log(res);
            getLoginQR();
           toast("Registered successfully");
           setLoading(true);
           // now route to the login page
        }
        catch(err)
        {
            console.log(err);
            toast('Couldnot register, Try using a different email id');
    
        }

        setName("");
        setEmail("");
        setPassword("");
       
      
    
    
        }

        const getLoginQR= async ()=>{
          // use the email and password to get the login qr
          // first of all i will get the user id after sending email and password under this api
          // and a route needs to be made on the backend that logs me in if a get request is sent to a api with that id 
          // on scanning on my custom scanner I will make that get request which will be setting the local storage

          try{
             
            // 1. make a request to get the id
            // 2. make a qr using beaconstac -> not dynamic -> which will have the get request url
            // 3. populate the state of img url

            const {data}= await axios.post('https://attend-it-backend.onrender.com/api/auth/qrid', {
              email: email,
              password: password
            });

            const {ciphertext}= data;

            const getUrl= 'https://attend-it-backend.onrender.com/api/auth/qrlogin/' + ciphertext;

            console.log(getUrl);
            //we need to use this geturl in the qrcode

            await getQRImageHandler(getUrl);
            


            }
            catch(err)
            {

            }

        }

        const getQRImageHandler= async(url)=>{
      
          try{
            console.log("handler called");
            const {data}= await axios.post('https://q.api.beaconstac.com/api/2.0/qrcodes/', {
                name: "Static Login QR",
                organization: 24595,
                qr_type: 1,
                fields_data: {
                    qr_type: 1,
                    url: url
                },
                location_enabled: false,
                attributes: {
                  color: "#000000",
                  dataPattern: "square",
                  eyeBallShape: "circle",
                  gradientType: "none",
                  eyeFrameColor: "#000000",
                  eyeFrameShape: "rounded",

                }
              }, axiosConfig
    
            );
    
    
            console.log(data);
            if(data)
            {
            const imgurl= await fetchQRImage(data.id);
              if(imgurl)
              {
                setQrimg(imgurl);
              }
            }
            
          }
    
          catch(err)
          {
            
             console.log(err);
             toast("Failed to load QR");

          }

          setLoading(false);
          
        }
  
        const fetchQRImage= async(id)=>{
          try{
            console.log(id);
             const {data}= await axios.get(`https://q.api.beaconstac.com/api/2.0/qrcodes/${id}/download/?size=1024&error_correction_level=5&canvas_type=png`, {
              headers:{
                'Authorization': 'Token 57c4d555b72e48bc12921ae87c96b2977018ba16', 
                'Content-Type': 'application/json'
              },
             });
             console.log(data);
             return data.urls.png;
            }
          catch(err)
          {
            console.log(err);
            toast("Failed to load QR");
          }
        }

  return (
    <>
        
        <div class="container">
        <div class="row justify-content-center align-items-center">
          <form class="row col-12"> 
        <div className="form-group">
          <label for="exampleName">Name</label>
          <input type="text" value= {name} className="form-control" id="exampleName" placeholder="Enter Name"  
          onChange={(e)=>{setName(e.target.value)}}
          />
        </div>
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
        { 
          <div className="container p-2 m-2" style={{alignContent:"center"}}>
          {(loading || qrimg != "") && <div style={{fontWeight: "600", textAlign:"center"}}>YOUR LOGIN QR</div>}
          {loading && 
          <div className="pt-2" style={{width:"60%",margin:"0 auto", display:"block" , textAlign:"center"}}>
          <Spin
            size="large"
        />
        </div>
        }
          {!loading && qrimg != "" && <img src={qrimg} className="p-3" style={{width:"60%",margin:"auto", display:"block" , border:"2px solid orange"}} />}
          </div>
        }
        </div>
       
        </>
  );
}

export default Register;
