import { useContext } from 'react';
import {Navbar, Nav, Container} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserContext from '../UserContext';


export default function AppNavbar(){

	const { user } = useContext(UserContext);

	return(
		<Navbar bg="dark" variant="dark" expand="lg">
	      <Container>
	        <Navbar.Brand variant="dark" as={Link} to="/">Home</Navbar.Brand>
	        }
	        }
	        }
	        }
	        <Navbar.Toggle aria-controls="basic-navbar-nav" />
	        <Navbar.Collapse id="basic-navbar-nav">
	          <Nav className="justify-content-end" style={{ width: "100%"}}>


	            {(user.id !== null) ?
	            	
	            	<Nav.Link as={Link} to="/logout">Logout</Nav.Link>
	
	            	:
	            	<>	

	            		<Nav.Link as={Link} to="/login">Login</Nav.Link>
	            	</>
	            }
	          </Nav>
	        </Navbar.Collapse>
	      </Container>
	    </Navbar>
	)
}