import {Container} from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppNavbar from './components/AppNavbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Error from './pages/Error';
import { useState, useEffect } from 'react';
import { UserProvider } from './UserContext';
import './App.css';

function App() {

  const [user, setUser] = useState({
    id: null,
    isAdmin: null
    
  })

  const unsetUser = () => {
    localStorage.clear();
  }



  useEffect(()=>{
    fetch(`https://e-commerce-api-djx5.onrender.com/users`,{
      headers:{
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res=>res.json())
    .then(data=>{

      if(typeof data._id !== "undefined"){
        setUser({
          id: data._id,
          isAdmin: data.isAdmin
         
        });
      }else{
        setUser({
          id: null,
          isAdmin: null

        })
      }
    })
  },[]);

  return (

    <UserProvider value = {{user, setUser, unsetUser}}>
        <Router>
          <AppNavbar/>
          <Container>
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/logout" element={<Logout/>}/>
              <Route path="*" element={<Error/>}/>
            </Routes>
          </Container>
        </Router>
    </UserProvider>

  );
}

export default App;
