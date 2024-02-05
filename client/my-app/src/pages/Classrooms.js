import React from 'react'
import Navbar from '../components/Navbar'
import {useState, useEffect, useContext} from 'react'
import AuthContext from '../context/AuthContext'
import axios from 'axios'
import ClassroomCard from '../components/ClassroomCard'
import { toast, ToastContainer } from 'react-toastify'
import {Modal} from 'antd'
import {FloatButton} from 'antd'
import './Classroom.css'
import {PlusOutlined} from '@ant-design/icons'
import {Empty} from 'antd'
const Classrooms = () => {

  const {user}= useContext(AuthContext);
  const [classroomList, setClassroomList]= useState([]);
  const [newClass, setNewClass]= useState("");
  const [showmodal , setShowmodal]= useState(false);

  useEffect(()=>{
    const fetchClasses= async ()=>{
        try{
        console.log(user._id);
        const res= await axios.get(`https://attend-it-backend.onrender.com/api/classroom/${user._id}`);
        console.log(res.data)
        setClassroomList(res.data);
        }
        catch(err)
        {
            console.log(err);
        }
    }

    fetchClasses();
    console.log(classroomList.length);
  }, [])

  const addClassroomHandler=async()=>{

    try{
        const {data}= await axios.post('https://attend-it-backend.onrender.com/api/classroom/', {
            classroomName: newClass,
            teacherId: user._id
        });

        setClassroomList([...classroomList, {
            ...data
        }])
        setShowmodal(false);


    }
    catch(err)
    {
        console.log(err);
        toast("Couldn't add classroom. Try again please.")
    }

    setNewClass("");
    
  }


  return (
    <>
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
    <Navbar />
    <div className='container-fluid mt-5' >
    <FloatButton style={{backgroundColor:"orange", color:"white", fontWeight:"700", width:"5rem", height:"5rem"}}icon= <PlusOutlined style={{fontSize:"1.5rem", fontWeight:"700"}}/>onClick={()=>setShowmodal(true)}/>
    <Modal centered okButtonProps={{ style: { backgroundColor: 'orange'} }}  style={{backgroundColor: "grey" , borderRadius:"20px"}} title="ADD NEW CLASSROOM" open={showmodal} onOk={addClassroomHandler} onCancel={()=>{setShowmodal(false)}}>

    <input type="text" className='form-control'  style= {{fontSize:"1.2rem", borderColor:"orange", borderWidth:"2px"}} value={newClass} onChange={(e)=> setNewClass(e.target.value)} placeholder="Add classroom name" />
    </Modal>
    {/* */}

    {
        // try generating custom images from replicate 

        classroomList.length ==0 ? 
        <div style={{ fontFamily:"Raleway", color: "#dddddd", textAlign:"center", marginTop:"20%"}}><Empty style={{fontSize:"1.5rem", fontFamily:"Raleway", color:"#dddddd"}} description={<span>No classrooms added</span>}/> </div> :
        <div style={{display:"flex", flexWrap:"wrap", height:"match-parent", width:"match-parent", alignItems:"center", marginTop:"10%"}}>
        {
            classroomList.map((myclass)=>{
                return <ClassroomCard id={myclass._id} name={myclass.classroomName} />
            })
        }
        </div>

    }
    </div>
    </>
  )
}

export default Classrooms