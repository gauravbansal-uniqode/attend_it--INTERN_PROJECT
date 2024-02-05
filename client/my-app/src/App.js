import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Register from './pages/Register';
import Login from './pages/Login'
import Auth from './pages/Auth'
import Classrooms from './pages/Classrooms';
import { useContext } from 'react';
import AuthContext from './context/AuthContext';
import Class from './pages/Class';
import Form from './pages/Form';
import "mapbox-gl/dist/mapbox-gl.css"

function App() {

  const {user}= useContext(AuthContext);
  return (

    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={user ? <Navigate to="/classrooms" />: <Auth/>} />
      <Route path="/classrooms" element={user ? <Classrooms/> : <Navigate to="/" />} />
      <Route path="/class/:id" element={user ? <Class /> : <Navigate to= "/" />} />
      <Route path="/form/:id" element={<Form />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
