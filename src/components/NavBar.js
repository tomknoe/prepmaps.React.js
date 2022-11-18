import { useState, useEffect} from "react";
import { useHistory } from "react-router";

import {Navbar, Nav, Container, InputGroup, Button, FormControl, Form, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

import { getSingleUserFromApi, isAuthenticated, loginUserToApi, logOut } from "../services/UserServices";

const NavBar = () => {
  const history = useHistory();
  const [authenticated, setAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState("")
  const [user, setUser] = useState({
    email: '',
    password: '',
  });


  useEffect(() => {
    checkAuth();
    getCurrentLoginName();
  }, []);

  const getCurrentLoginName = async () => {
    if(!localStorage.getItem('jwtprepmap'))return;
    const response = await getSingleUserFromApi(JSON.parse(localStorage.getItem('jwtprepmap')).user.uid)
    setCurrentUser(response.data.name)
  }

  const checkAuth = () => {
    if (isAuthenticated()) {
      setAuthenticated(true);
    }
  };

  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userResponse = await loginUserToApi(user);
    setUser({
      email: '',
      password: ''
    })
    window.location.reload();
    history.push('/')
  }

  const handleLogOut = async () => {
    await logOut();
    setAuthenticated(false);
    window.location.reload();
    history.push("/");
  };


  return (
    <Navbar expand="sm" style={{backgroundColor:"#ffffff"}}>
      <Container>
        <Navbar.Brand onClick={()=>history.push('/')} style={{padding: "10px", cursor: "pointer"}}>
          <img src="/brand-logo.svg" width="220px" alt="PrEP Maps Miami Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto" style={{fontSize: "17px", marginTop: "10px"}}>

          <Nav.Link onClick={()=>history.push('/')} href="#about">About</Nav.Link>

          <Nav.Link onClick={()=>history.push('/')} href="#resources">Resources</Nav.Link>

              {!isAuthenticated() ? (
                <NavDropdown title="Register" id="basic-nav-dropdown" align={{ lg: 'end' }}>
                  <Form
                    style={{
                      textAlign: "center",
                      padding: "10px",
                      width: "250px",
                    }}
                  >
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Control type="email" placeholder="Email" onChange={handleChange} name="email" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Control type="password" placeholder="Password" onChange={handleChange} name="password" />
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={handleSubmit} style={{width:"100%"}}>
                      Login
                    </Button>
                    <br/>
                    <NavDropdown.Divider />
                    <Button variant="outline-primary" type="button" onClick={() => history.push("/signup")} style={{width:"100%"}}>
                      Sign up
                    </Button>
                  </Form>
                  </NavDropdown>
              ) : (
                <NavDropdown title={currentUser} id="basic-nav-dropdown" align={{ lg: 'end' }}>
                  <Form
                    style={{
                      textAlign: "center",
                      padding: "10px",
                      width: "250px",
                    }}
                  >
                    <Button variant="primary" type="button" onClick={() => history.push("/profile/" + JSON.parse(localStorage.getItem('jwtprepmap')).user.uid)} style={{width:"100%"}}>
                      View Profile
                    </Button>
                    <NavDropdown.Divider />
                    <Button variant="outline-primary" type="button" onClick={handleLogOut} style={{width:"100%"}}>
                      Sign Out
                    </Button>
                  </Form>
                  </NavDropdown>
              )}
          </Nav>
          <Nav>
            <Navbar.Text style={{fontSize: "12px", marginTop: "11px"}}>
              Created by: <a href="https://thomasknoepffler.com" target="_blank">Thomas Knoepffler</a>
            </Navbar.Text>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
