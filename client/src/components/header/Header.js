import React, { useState } from 'react';
import { Navbar, Nav,   Button, Modal } from "react-bootstrap"
import { Link } from "react-router-dom";
import "./header.css";
import Logo from '../../t.png';
import { connect } from 'react-redux';
import { FaShoppingCart } from "react-icons/fa";
import useLogout from "../../hooks/useLogout";
import Profile from "../profile/profile";

const Header = ({ user, dispatch }) => {
  const [show, setShow] = useState(false);
  const log_out = useLogout();
  return (
    <Navbar className="header border-bottom" expand="lg">
      <Link to="/"><img src={Logo} /></Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto mr-5">
          <Link className="nav-link" to="/">Home</Link>
          <Link className="nav-link" href="#link">About</Link>
          {user.isLogged ? (<>
            <a className="nav-link" href="#" onClick={log_out} >Log-out</a>
            <Link className="nav-link" to="/orders">My-orders</Link>
            <Link className="nav-link" to="/cart"><FaShoppingCart /></Link>
            <Button className="nav-link bg-transparent border-0 font-weight-bold" onClick={() => setShow(true)}>Profile</Button>
            {user.user.isAdmin?<Link className="nav-link" to="/admin">Admin</Link>:<></>}
          </>) : (<><Link className="nav-link" to="/register">Sign-Up</Link>
            <Link className="nav-link" to="/login">Log-In</Link></>)}
        </Nav>

      </Navbar.Collapse>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Info</Modal.Title>
        </Modal.Header>
        <Profile  />
        <Modal.Footer>
          

        </Modal.Footer>
      </Modal>
    </Navbar>
  )
}
const mapStateToProps = (state) => {
  return state;
}
export default connect(mapStateToProps)(Header);