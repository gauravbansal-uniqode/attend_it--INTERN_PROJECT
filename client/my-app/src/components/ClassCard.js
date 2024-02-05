import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react';
import { toast , ToastContainer} from 'react-toastify';
import Response from './Response';
import './ClassCard.css'
import {Spin} from 'antd'

const ClassCard = ({id, name, latitude, longitude}) => {

    // can add generate pdf report of responses also if want to ->FEATURE ADDITION -> CAN BE SEEN AT END]
    

    // issi mei qr generate krna hoga
    // make a small list type component -> onclick it opens a modal with a qr that has that id
    /* ON THE CARD WE HAVE OPTION OF SHOW QR AND SHOW RESPONSES */
    const [show, setShow]= useState("");
    const [qrurl, setQrurl]= useState("");
    const [responses, setResponses]= useState([]);
    const [acceptingResponses, setAcceptingResponses]= useState(true);
    const [loading, setLoading]= useState(false);

    useEffect(()=>{

      const isAcceptingResponse= async()=>{
        try{
        const {data}= await axios.get(`https://attend-it-backend.onrender.com/api/classroom/isAccepting/${id}`);
        setAcceptingResponses(data);
        }
        catch(err)
        {
          console.log(err);
        }
      }

      isAcceptingResponse();

    }, [])

    let axiosConfig = {
      headers:{
        'Authorization': 'Token 57c4d555b72e48bc12921ae87c96b2977018ba16', 
        'Content-Type': 'application/json'
      }
    };

    





    const getQRImageHandler= async()=>{
      
      try{
        setLoading(true);
        console.log("handler called");
        const {data}= await axios.post('https://q.api.beaconstac.com/api/2.0/qrcodes/', {
            name: "Mongodb",
            organization: 24595,
            qr_type: 2,
            campaign: {
              content_type: 1,
              custom_url:`https://1602-14-143-179-154.ngrok-free.app/form/${id}`
            },
            location_enabled: false,
            attributes: {
              color: "#ffa500",
              "dataPattern":"square",
              "eyeBallShape":"circle",
              "gradientType":"none",
              "eyeFrameColor":"#000000",
              "eyeFrameShape":"rounded"
            }
          }, axiosConfig

        );


        console.log(data);
        if(data)
        {
        const imgurl= await fetchQRImage(data.id);
          if(imgurl)
          {
          setQrurl(imgurl);
          setShow("qr");
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

    const responsesHandler= async ()=>{

      try{
        setLoading(true);
        const {data}= await axios.get(`https://attend-it-backend.onrender.com/api/classroom/get-responses/${id}`)
        setResponses(data);
        setShow("responses");
        console.log(data);
      }
      catch(err)
      {
        console.log(err);
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
    

    const toggleAcceptHandler= async ()=>{
      try{
          const {data}= await axios.get(`https://attend-it-backend.onrender.com/api/classroom/toggleAccept/${id}`);
          setAcceptingResponses(!acceptingResponses);
      }
      catch(err)
      {
        toast("Some error occured. Try Again");
        console.log(err);
      }
    }
  return (
    <>
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
    <div className='container row p-3 my-2 comp' style={{width: "match-parent"}}>
      <div className='row'>
      <div className='col' style={{fontSize: "1.5rem", width:"fit-content"}}>{name}</div>
      <div className='col' style={{width:"fit-content"}}>
      { show != "qr"?
        <button onClick={getQRImageHandler} className='btn btn-primary' style={{backgroundColor:"green"}}>SHOW QR</button> :
        <button onClick={()=>setShow("")} className='btn btn-primary' style={{backgroundColor:"whitesmoke", color:"black"}}>HIDE QR</button>
      }
        </div> 
      <div className='col' style={{width:"fit-content"}}>
      {
        show != "responses"?
        <button className='btn btn-primary' style={{backgroundColor:"green"}} onClick={responsesHandler}>SHOW RESPONSES</button> :
        <button className='btn btn-primary' style={{backgroundColor:"whitesmoke", color:"black"}} onClick={()=>{setShow("")}}>HIDE RESPONSES</button>
      }
      </div>
      <div className='col' style={{width:"fit-content"}}>
      {

        acceptingResponses?
        <button className='btn btn-primary' style={{backgroundColor:"red"}} onClick={toggleAcceptHandler}>STOP ACCEPTING</button> :
        <button className='btn btn-primary' style={{backgroundColor:"whitesmoke", color:"green"}} onClick={toggleAcceptHandler}>ACCEPT RESPONSES</button>
      }
      </div>
      {
        !loading && show == "qr" && <div className='row pt-3'><img src={qrurl}  style={{width: "40%", height:"80%", margin:"auto", border:"2px solid orange"}}/></div>
      }
      {
        show == "responses" && 
        <div className='row'>
        {
          !loading && 
          (responses.length !=0 ?
          responses.map((item)=>{
            return <Response name= {item.name} rollno= {item.rollno} classLocation={{latitude, longitude}} responseLocation={{ latitude: item.latitude,longitude: item.longitude}} />
          })
          :
          <div  className="pt-5 mt-2" style={{textAlign:"center", fontSize:"2rem" , fontFamily:"Raleway", fontWeight:"600", color:"#bbbbbb"}}>NO RESPONSES TO SHOW</div>)
        }
        </div>
      }
      {
        loading && 
        <div className="row pt-3" style={{fontSize:"2rem", fontFamily:"Raleway"}}><Spin size="large"  style={{ fontSize:"3rem" , width: "40%", height:"80%", margin:"auto"}} ></Spin></div>
      }
      </div>
    </div>
    </>
  )
}

export default ClassCard