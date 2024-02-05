import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import './Navbar.css'

const Navbar = () => {

 const {user, dispatch}= useContext(AuthContext);

 const logoutHandler=()=>{
    console.log("Logout called");
    try{
    localStorage.removeItem("user");
    }
    catch(err)
    {
        console.log(err);
    }
    dispatch({type:"LOGOUT"});

 }

 
  return (
    <div className='row nav' style={{width: "match-parent", opacity:"90%"}}>
    <div className= "col-4 p-4 pb-2 lead"><p className="heading ">attend_it</p></div>
    <div className='col-4 p-5' style={{fontSize: "2rem", fontWeight:'600', color:"orange", fontFamily:"Raleway"}}>
    {!user.teachername ? "YOUR" : user.teachername + "'s"} Classroom
    </div>
    <div className='col-4 p-5 mr-2' style={{textAlignLast: "right" , fontSize: "1.5rem"}}>
    <span onClick= {logoutHandler} style={{fontSize: "1.5rem", fontWeight:'600', color:"orange", fontFamily:"Raleway"}}>LOGOUT</span>
    </div>
    </div>
  )
}

export default Navbar