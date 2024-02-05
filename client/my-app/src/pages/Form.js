import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { FrownOutlined, MehOutlined, SmileOutlined } from '@ant-design/icons';
import { Flex, Rate } from 'antd';

const customIcons = {
  1: <FrownOutlined />,
  2: <FrownOutlined  />,
  3: <MehOutlined />,
  4: <SmileOutlined />,
  5: <SmileOutlined/>,
};

const Form = () => {
  const {id}= useParams();  // this should contain the room id for which these responses must be set
  const [name, setName]= useState("");
  const [rollno, setRollno]= useState("");
  const [location, setLocation]= useState(null);
  const [acceptingResponses, setAcceptingResponses]= useState(false);

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
    getCurrentLocation();
  }, [])


  const getCurrentLocation = async() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        showPosition,
        showError
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const showPosition = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

     console.log(latitude, longitude);
    setLocation({latitude, longitude});

  };

  const showError = (error) => {
    alert(`Error getting location: ${error.message}`);
  };

  const onSubmitHandler= async(e)=>{
    // add response to room id
    try{
      e.preventDefault();
      if(name === "")
      {
        toast("Name field can't be empty");
        return;
      }
      if(rollno === "")
      {
        toast("Roll No. field can't be empty");
        return;
      }
      if(!location)
      {
        toast("You must give access to location to submit the form");
        return;
      }

        const {data}= await axios.post(`https://attend-it-backend.onrender.com/api/classroom/add-response/${id}`,{
            name: name,
            rollno: rollno,
            latitude: location.latitude,
            longitude: location.longitude
        });
        console.log(data);
        setName("");
        setRollno("");
        toast("Your response has been recorded");

    }
    catch(err)
    {
        console.log(err);
        toast("Couldn't add your response. Try Again")
        
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
    <div className='container-fluid align-items-center'>
    <div className= "row p-3 mb-5 lead bg-light"><div className="col h1 heading">attend_it</div><div className='m-3 col' style={{color:"orange", fontSize:"2rem", fontWeight:"700", fontFamily:"Raleway"}}>ATTENDANCE FORM</div></div>
    
    <div class="container p-4 bg-light mt-4" >
    <div class="row justify-content-center align-items-center">
    {
      acceptingResponses? 
      (<form class="row col-12"> 
    <div className="form-group">
      <label for="exampleName">Add your Name</label>
      <input type="text" value= {name} className="form-control" id="exampleName" placeholder="Enter Name"  
      onChange={(e)=>{setName(e.target.value)}}
      />
    </div>
    <div className="form-group pt-3">
      <label for="exampleInputEmail1">Add your Roll No</label>
      <input type="text" value={rollno} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Roll No"  
      onChange={(e)=>{setRollno(e.target.value)}}
      />
    </div>
    {/* <div className='form-group pt-3'>
    <Flex gap="middle" vertical >
    <label for="exampleRating">How was your class?</label>
    <Rate id="exampleRating" style={{fontSize:"4rem" , color:"orange"}} defaultValue={3} character={({ index = 0 }) => customIcons[index + 1]} />
  </Flex>
    </div> */}
    <div class="form-group pt-3">
    <button type="submit" className="btn" style={{backgroundColor: "darkorange", color:"white", fontWeight:"600"}} onClick={onSubmitHandler}>Submit</button>
    </div>
    </form>)
    :
    <div style={{textAlign:"center", fontWeight:"600", fontSize:"2rem", fontFamily:"Raleway"}}> THIS FORM IS NOT ACCEPTING RESPONSES </div>
    }
    </div>
    </div>
    </div>
   
    </>

    

  )
}

export default Form