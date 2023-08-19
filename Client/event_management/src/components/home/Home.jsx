import React, { useEffect, useState } from "react";
import axios from "axios";
import "./home.css";
import Footer from "../footer/Footer";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { AiFillCloseSquare } from "react-icons/ai";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

const Home = () => {
  const [eventdata, setEventdata] = useState([]);
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

  const allevents = async () => {
    var user_id = localStorage.getItem("user_id");
    // console.log(date2);
    const data = {
      user_id: user_id,
    };
    const res = await axios.post("http://localhost:1010/getallevents", data);
    console.log(res);
    if (res?.data?.success === "yes") {
      setEventdata(res?.data?.data);
    }
  };

  const like_or_dislike_event = async (event_id) => {
    var user_id = localStorage.getItem("user_id");
    if (!localStorage.getItem("isLoggedIn")) {
      window.location = "/login";
    } else {
      var data = {
        user_id: user_id,
        event_id: event_id,
      };
      const res = await axios.post(
        "http://localhost:1010/like_or_dislike_event",
        data
      );
      // console.log(res);
      if (res?.data?.success === "yes") {
        allevents();
      }
    }
  };

  const handlecancel = async (event_id) => {
    if (window.confirm("Delete the item?")) {
      var data = {
        event_id: event_id,
      };
      const res = await axios.post("http://localhost:1010/deleteevent", data);
      if (res?.data?.success === "yes") {
        NotificationManager.success("Event deleted successfully.")
        allevents();
      }
    }
  };

  useEffect(() => {
    allevents();
    checkadminornot();
  }, []);
  return (
    <>
      <div className="cards">
        {eventdata.map((pro, index) => (
          <>
            <div
              key={index}
              className="innercards"
              style={{ position: "relative" }}
            >
              {admin ? (
                <button
                  style={{
                    width: "30px",
                    position: "absolute",
                    left: "183px",
                    alignItems: "center",
                    display: "flex",
                    backgroundColor: "white",
                    border: "1px solid grey",
                  }}
                  onClick={() => handlecancel(pro.id)}
                >
                  {
                    <AiFillCloseSquare
                      style={{
                        fontSize: "20px",
                        cursor: "pointer",
                      }}
                    />
                  }
                </button>
              ) : (
                ""
              )}
              <img
                src={pro.image}
                alt="imges"
                className="eventimg"
                onClick={() => {
                  window.location.href = "/eventdetail/" + pro.id;
                }}
              />
              <div className="detailsof">
                <h5>{pro.event_name}</h5>
                <div onClick={() => like_or_dislike_event(pro.id)}>
                  {pro.is_liked ? (
                    <AiFillHeart
                      style={{
                        fontSize: "35px",
                        color: "red",
                        cursor: "pointer",
                      }}
                    />
                  ) : (
                    <AiOutlineHeart
                      style={{ fontSize: "35px", cursor: "pointer" }}
                    />
                  )}
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
      <NotificationContainer/>
      <Footer />
    </>
  );
};

export default Home;
