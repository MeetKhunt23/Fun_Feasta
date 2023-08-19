import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./singleevent.css";
import Model from "./model.jsx";
import Button from "react-bootstrap/Button";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import moment from "moment";

const Singleevent = () => {
  const id = useParams();
  const [eventdata, setEventdata] = useState({});
  const [ticketsleft, setTicketsleft] = useState("");
  const [countlikes, setcountlikes] = useState({ likes: 0 });
  const [Comment, setComment] = useState("");
  const [Commentlist, setCommentlist] = useState([]);

  console.log(ticketsleft);

  const Geteventdetail = async () => {
    var user_id = localStorage.getItem("user_id");
    var page = {
      event_id: id.id,
      user_id: user_id,
    };
    const res = await axios.post("http://localhost:1010/geteventdetails", page);
    console.log(res);
    if (res?.data?.success === "yes") {
      setEventdata(res?.data?.data);
    }
  };

  const Geteventlikes = async () => {
    // var user_id = localStorage.getItem("user_id");
    var page = {
      event_id: id.id,
    };
    const res = await axios.post("http://localhost:1010/count_likes", page);
    console.log(res);
    if (res?.data?.success === "yes") {
      setcountlikes(res?.data?.data);
    }
  };

  const getticketsleft = async (event_id) => {
    var data = {
      event_id: id.id,
    };
    const res = await axios.post("http://localhost:1010/ticketyettosold", data);
    console.log(res);
    if (res?.data?.success === "yes") {
      setTicketsleft(res.data.data);
      if (res.data.data.tickets_left === 0) {
        // window.location.reload();
      }
      // tickets_left
    }
  };

  const like_or_dislike_event = async () => {
    var user_id = localStorage.getItem("user_id");
    if (!localStorage.getItem("isLoggedIn")) {
      window.location = "/login";
    } else {
      var data = {
        user_id: user_id,
        event_id: id.id,
      };
      const res = await axios.post(
        "http://localhost:1010/like_or_dislike_event",
        data
      );
      // console.log(res);
      if (res?.data?.success === "yes") {
        // allevents();
        Geteventdetail();
        Geteventlikes();
      }
    }
  };

  const postcomment = async () => {
    if (!localStorage.getItem("isLoggedIn")) {
      window.location = "/login";
    } else if (Comment === "") {
      NotificationManager.error("Comment Field is empty.");
    } else {
      var user_id = localStorage.getItem("user_id");
      var data = {
        user_id: user_id,
        event_id: id.id,
        comment: Comment,
      };
      const res = await axios.post("http://localhost:1010/post_comment", data);

      if (res?.data?.success === "yes") {
        NotificationManager.success("Comment Added Sucessfully.");
        setComment("");
        getallcomments();
      } else {
        NotificationManager.success("Something went wrong.");
      }
    }
  };

  const getallcomments = async () => {
    var data = {
      event_id: id.id,
    };
    const res = await axios.post(
      "http://localhost:1010/getcommentsbyevent",
      data
    );

    if (res?.data?.success === "yes") {
      setCommentlist(res.data.data);
    } else {
      NotificationManager.success("Something went wrong.");
    }
  };

  const handleenter = (e) => {
    if (e.keyCode === 13) {
      postcomment();
    }
  };
  useEffect(() => {
    Geteventdetail();
    getticketsleft();
    Geteventlikes();
    getallcomments();
  },[]);
  return (
    <>
      <div className="maincon">
        <div>
          <img src={eventdata.image} className="imgcon" alt="imgd" />
        </div>
        <div className="detailcon">
          <h3>{eventdata.event_name}</h3>
          <h5>Venue:&nbsp;{eventdata.event_place}</h5>
          <h5>Date:&nbsp;{eventdata.event_date}</h5>
          <h5>Organizer:&nbsp;{eventdata.contact_person}</h5>
          <h5>Conatct:&nbsp;{eventdata.contact_no}</h5>
          <h5>Entry Fees:&nbsp;{eventdata.entry_fee}&#8377; </h5>
        </div>
        <div>
          {ticketsleft.tickets_left !== 0 ? (
            <div className="tbook">
              <Model
                className="tbook"
                buttonname="Book Ticket"
                event_id={id.id}
                entry_fee={eventdata.entry_fee}
                loading={true}
              />
            </div>
          ) : (
            <Button variant="primary" className="fulbtn" size="lg" disabled>
              House Full
            </Button>
          )}
          <div className="tlikedcont">
            <div onClick={() => like_or_dislike_event()}>
              {eventdata.is_liked ? (
                <AiFillHeart
                  style={{ fontSize: "35px", color: "red", cursor: "pointer" }}
                />
              ) : (
                <AiOutlineHeart
                  style={{ fontSize: "35px", cursor: "pointer" }}
                />
              )}
            </div>
            <span>{countlikes.likes} : likes</span>
          </div>
          <div className="coment">
            <input
              type="text"
              value={Comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="comment down your review"
              onKeyUp={(e) => handleenter(e)}
            />
            <button className="postbtn" onClick={() => postcomment()}>
              POST
            </button>
          </div>
        </div>
      </div>
      <div className="commentcon">
        <h3 style={{textAlign:"left",marginLeft:"12%"}}>Comments : </h3>
        {Commentlist.map((row, index) => (
          <>
            <div className="singlecommnt">
              <div className="content">
                <div>
                  <div style={{ textAlign: "left", color: "grey" }}>
                    <span>{index + 1}</span>. {row.first_name} {row.last_name}
                  </div>
                  <div style={{ textAlign: "left", color: "black" }}>
                    "{row.comment}"
                  </div>
                </div>
                <div>{moment(row.create_date).fromNow()}</div>
              </div>
            </div>
          </>
        ))}
      </div>
      <NotificationContainer />
    </>
  );
};

export default Singleevent;
