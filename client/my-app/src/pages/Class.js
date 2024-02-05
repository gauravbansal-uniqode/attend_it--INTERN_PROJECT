import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ClassCard from '../components/ClassCard';
import Navbar from '../components/Navbar';
import { toast } from 'react-toastify';
import {Modal} from 'antd'
import {FloatButton} from 'antd'
import './Classroom.css'
import {PlusOutlined} from '@ant-design/icons'
import Mapbox from '../components/Mapbox';

const Class = () => {
  const [classes, setClasses]= useState([]);
  const [className, setClassName]= useState("");
  const [newroom, setNewroom]= useState("");
  const {id}= useParams();
  const [showmodal, setShowmodal]= useState(false);
  const [loc, setLoc]= useState(null);

  useEffect(()=>{
    console.log("called");
    const fetchClass= async ()=>{
        try{
            const {data}= await axios.get(`https://attend-it-backend.onrender.com/api/classroom/classes/${id}`);
            console.log(data);
            setClassName(data.name);
            setClasses(data.classes);
        }
        catch(err){
            console.log(err);
        }
    }

    fetchClass();
    console.log(classes.length);
  }, [])

  const roomAddHandler= async()=>{
      try{

          if(newroom == "")
          {
            toast("Please enter a room name");
            return;
          }
          if(!loc)
          {
            toast("Please enter the class location");
            return;
          }
          const {data}= await axios.post(`https://attend-it-backend.onrender.com/api/classroom/add-class/${id}`, {
            className: newroom,
            latitude: loc.latitude,
            longitude: loc.longitude
          });
          setClasses([...classes, data]);
          setNewroom("");
          setShowmodal(false);
      }
      catch(err){
          console.log(err);
          toast("Couldn't create new room. Try Again")
      }
  }

  const getLocation= (location)=>{

    setLoc({
      latitude: location.latitude,
      longitude: location.longitude
    })
    console.log("called from class:"+ location.latitude + "   " + location.longitude)

  }

  return (
    <>
    <Navbar/>
    <FloatButton style={{backgroundColor:"orange", color:"white", fontWeight:"700", width:"5rem", height:"5rem"}}icon= <PlusOutlined style={{fontSize:"1.5rem", fontWeight:"700"}}/>onClick={()=>setShowmodal(true)}/>
    <Modal centered okButtonProps={{ style: { backgroundColor: 'orange'} }}  style={{backgroundColor: "grey" , borderRadius:"20px"}} title="ADD NEW ROOM" open={showmodal} onOk={roomAddHandler} onCancel={()=>{setShowmodal(false)}}>
   
    <div className='row p-4 container'>
    <input type="text" value={newroom} onChange={(e)=>{setNewroom(e.target.value)}}style={{fontSize:"1.2rem"}} placeholder='Enter room name' className='form-control'/>
    </div>
    <div>
      <Mapbox getLocation={getLocation}/>
    </div>
    </Modal>
    <div className='container'>
    
    <div className='row m-5 p-3'></div>
    <div className='pt-5 pb-3' style={{fontSize: "2rem",fontWeight:"700", fontFamily:"DM Sans"}}>{className}</div>

    
    <div>
    {
        classes.length ==0 ? 
        <div className='pt-1' style={{fontFamily:"Raleway", fontWeight:"600", fontSize:"1.2rem" , color:"#aaaaaa"}}>No classes to show</div> 
        :
        
        classes.map((item)=>{return <ClassCard id={item ._id} name={item.name} latitude={item.latitude} longitude={item.longitude}/>})
        
    }
    </div>
    </div>
    </>
  )
}

export default Class