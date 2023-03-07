import {Form, Button} from 'react-bootstrap';
import {useState, useEffect, useContext} from 'react';
import UserContext from '../UserContext';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';


export default function Login() {

  const [email, setEmail] = useState ('');
  const [password, setPassword] = useState ('');
  const [isActive, setIsActive] = useState ('');

  const { user, setUser } = useContext(UserContext);



  function authenticate(e) {

      e.preventDefault()


      fetch(`https://e-commerce-api-djx5.onrender.com/users/login`, {
        method: 'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      })
      .then(res=>res.json())
      .then(data=>{

      


       

        if(typeof data.access !== "undefined"){

          
          localStorage.setItem('token',data.access)


          retrieveUserDetails(data.access)


          Swal.fire({
            title: "Login Successful!",
            icon: "success",
            text: "Welcome!!!"
          });

        }else{

          Swal.fire({
            title: "Authentication Failed!",
            icon: "error",
            text: "Check your credentials!" 
          });
          
        }
      })

      const retrieveUserDetails = (token) =>{


        fetch(`https://e-commerce-api-djx5.onrender.com/users/getUserDetails`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        })
        .then(res=>res.json())
        .then(data=>{
        


          setUser({
            id: data._id,
            isAdmin: data.isAdmin
          });
        })
      }

      setEmail("");
      setPassword("");


  }

  useEffect(()=>{

    if(email !== "" && password !== ""){
      setIsActive(true)
    } else {
      setIsActive(false)
    }
 

  }, [email, password])



  return (

    (user.id !== null)
    ?
    <Navigate to="/home"/>

    :
    <Form onSubmit={(e)=>authenticate(e)}>
      <Form.Group className="mb-3" controlId="userEmail">
      <h1>Log In</h1>
        <Form.Label>User Name</Form.Label>
        <Form.Control
        type="username"
        placeholder="Enter your username"
        value={email}
        onChange={e=>setEmail(e.target.value)}
        required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
        type="password"
        placeholder="Password"
        value={password}
        onChange={e=>setPassword(e.target.value)}
        required
        />
      </Form.Group>

      { isActive ?
      <Button className="mx-3" variant="success" type="submit" id="submitLogBtn">
        Login
      </Button>
      :
      <Button className="mx-3" variant="danger" type="submit" id="submitLogBtn" disabled>
        Login
      </Button>
      }

    </Form>
  );
}
