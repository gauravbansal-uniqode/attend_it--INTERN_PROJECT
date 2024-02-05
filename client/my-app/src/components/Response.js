import React from 'react'
import './Response.css'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
const Response = ({name, rollno, classLocation, responseLocation}) => {

  const lat1= parseFloat(classLocation.latitude).toFixed(2);
  const long1= parseFloat(classLocation.longitude).toFixed(2);
  const lat2= parseFloat(responseLocation.latitude).toFixed(2);
  const long2= parseFloat(responseLocation.longitude).toFixed(2);
  return (
    <div className='container row p-4 m-3 box-shadow-3d' style={{borderRadius: "4px"}}>
    <div className='col-5' style={{fontSize:"1rem"}}>{name}</div>
    <div className='col-4' style={{fontSize:"1rem"}}>{rollno}</div>
    {/* <div>{classLocation.latitude + " "+  classLocation.longitude } + {responseLocation.latitude + " " +  responseLocation.longitude}</div> */}
    { (lat1 != lat2 || long1 != long2) ?
      <div className='col-3 '><div className="m-1"style={{backgroundColor:"red", color:"white", borderRadius:"4px", fontWeight:"700", textAlign:"center"}}>LOCATION MISMATCH</div></div> :
      <div className='col-2' style={{color:"white", borderRadius:"4px", fontWeight:"700", textAlign:"center"}}><CheckCircleIcon style={{color:"green", fontSize:"2.5rem"}}/></div> 

    }
    </div>
  )
}

export default Response