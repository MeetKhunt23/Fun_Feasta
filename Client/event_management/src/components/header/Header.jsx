import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import axios from "axios";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import Loader from "../../assets/loadder.gif";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const first_name = localStorage.getItem("first_name");
const last_name = localStorage.getItem("last_name");
const isLogin = localStorage.getItem("isLoggedIn")
  ? localStorage.getItem("isLoggedIn")
  : "false";
const id = localStorage.getItem("user_id");

const Header = () => {
  const navigate = useNavigate();
  const [admin, setadmin] = useState(false);

  const checkadminornot = async () => {
    var user_id = localStorage.getItem("user_id");
    var data = {
      user_id: user_id,
    };
    const res = await axios.post("http://localhost:1010/checkadmin", data);

    if (res.data.success === "yes") {
      setadmin(true);
    }
  };
  const userprofile = () => {};
  const updateProfile = () => {};

  const changepassword = () => {};

  const logout = () => {
    localStorage.removeItem("user_id");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("first_name");
    localStorage.removeItem("last_name");
    localStorage.removeItem("country_id");
    localStorage.removeItem("state_id");
    localStorage.removeItem("city_id");
    NotificationManager.success("logout successfully");
    navigate("/login");
    // window.location.reload();
  };

  // const checkadminornot = async () => {
  //   var user_id = localStorage.getItem("user_id");
  //   var data = {
  //     user_id: user_id,
  //   };
  //   const res = await axios.post("http://localhost:1010/checkadmin", data);

  //   if (res.data.success === "yes") {
  //     NotificationManager.success(`Welcome ${res.data.data.Name}`);
  //     navigate("/addevent");
  //   } else {
  //     NotificationManager.error(res.data.message);
  //   }
  // };

  const openadminpanel = async () => {
    var user_id = localStorage.getItem("user_id");
    var data = {
      user_id: user_id,
    };
    const res = await axios.post("http://localhost:1010/checkadmin", data);

    if (res.data.success === "yes") {
      NotificationManager.success(`Welcome ${res.data.data.Name}`);
      navigate("/adminpanel");
    } else {
      NotificationManager.error("Sorry,You dont have access to adminpanel.");
    }
  };

  const getmylikedlist = () => {
    if (!localStorage.getItem("isLoggedIn")) {
      window.location = "/login";
    } else {
      window.location.href = "/myliked_events";
    }
  };

  const getmybookings = () => {
    if (!localStorage.getItem("isLoggedIn")) {
      window.location = "/login";
    } else {
      window.location.href = "/mybookings";
    }
  };

  useEffect(() => {
    checkadminornot();
  }, []);

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">FUN FEASTA</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <NavDropdown title="Profile" id="basic-nav-dropdown">
                <NavDropdown.Item href="/userprofile">
                  My Profile
                </NavDropdown.Item>
                <NavDropdown.Item href="/updateprofile">
                  Update Profile
                </NavDropdown.Item>
                <NavDropdown.Item href="/changepassword">
                  Change Password
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => logout()}>
                  Log out
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link onClick={()=>getmybookings()}>My Bookings</Nav.Link>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <div className="row p-3">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                      <h5 className="welcome">
                        Welcome,{" "}
                        {!first_name ? <></> : first_name + " " + last_name}
                      </h5>
                    </div>
                    {isLogin == "false" ? (
                      <>
                        <p style={{ marginTop: "15px" }}>
                          To access account and manage orders
                        </p>
                        <div className="col-12 col-sm-12 col-md-3 col-lg-5">
                          <button
                            className="btn login-btn"
                            onClick={() => {
                              window.location.href = "/signup";
                            }}
                            type="btn"
                          >
                            Sign up
                          </button>
                        </div>
                        <div className="col-12 col-sm-12 col-md-3 col-lg-5 mt-2 mt-sm-3 mt-md-0 mt-lg-0">
                          <button
                            className="btn login-btn"
                            onClick={() => {
                              window.location.href = "/login";
                            }}
                            type="btn"
                          >
                            Log In
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                    <li className="text-center dropdown-divider-width">
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        onClick={() => userprofile()}
                      >
                        MY PROFILE
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        onClick={() => updateProfile()}
                      >
                        UPDATE PROFILE
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        onClick={() => changepassword()}
                      >
                        CHANGE PASSWORD
                      </a>
                    </li>
                    <li className="text-center dropdown-divider-width">
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <a className="dropdown-item" onClick={() => logout()}>
                        LOGOUT
                      </a>
                    </li>
                  </>
                    )}
                  </div>
                </li>
              </ul>
            </Nav>
          </Navbar.Collapse>
          <>
            {admin ? (
              <div className="admins">
                <div
                  className="addevent"
                  onClick={() => openadminpanel()}
                  style={{ marginRight: "10px" }}
                >
                  Admin
                </div>
                <div className="addevent" onClick={() => {window.location.href="/addevent"}}>
                  Add Event
                </div>
              </div>
            ) : (
              ""
            )}
          </>
          <div style={{ marginLeft: "20px", cursor: "pointer" }}>
            {" "}
            👉
            <AiFillHeart
              style={{
                color: "red",
                fontSize: "35px",
              }}
              onClick={() => getmylikedlist()}
            />
          </div>
        </Container>
      </Navbar>
      <NotificationContainer />
    </div>
  );
};

export default Header;
