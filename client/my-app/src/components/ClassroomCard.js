import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import './ClassroomCard.css'

const ClassroomCard = ({id, name}) => {

  const navigate= useNavigate();
  const [imgurl, setImgurl]= useState("");
  const classroomSelectHandler= ()=>{
    console.log("classroom clicked"+ id);
    navigate(`/class/${id}`);
  }

  useEffect(()=>{
    fetchImge();
  },[])
  const fetchImge= async ()=>{
    try{
        const {data}= await axios.get(`https://api.pexels.com/v1/search?query=${name}`, {
          headers:{
            'Authorization': 'CuXr5jWrQEh38a4vgm8n7QsVeUD3vm7Z1f47sbvdrnzaBtVNmuJJgCGm',
            'Content-Type': 'application/json'
          }
        });

        setImgurl(data.photos[0].src.original);

    }
    catch(err){

    }
  }
    // to add custom images from replicate
  return (
    <div className="m-3 p-0" onClick={classroomSelectHandler} style={{color: "orange", width:"30%", height:"30%", fontSize:"3rem", backgroundColor:"whitesmoke", borderRadius:"20px", textAlign:"center"}}> 
    <img className='img-responsive' src= {imgurl} style={{zindex:0,width:"100%",  height:"100%", objectFit: "cover", overflow: "hidden", borderTopLeftRadius:"20px", borderTopRightRadius:"20px"}} />
    <span className="overlay-text raleway" style={{color:"black", fontWeight:"2rem", zindex:1}} >{name}</span>

    </div>
  )
}

export default ClassroomCard