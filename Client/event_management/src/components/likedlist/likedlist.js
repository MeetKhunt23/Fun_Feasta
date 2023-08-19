import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import "react-notifications/lib/notifications.css";
// import Form from "react-bootstrap/Form";
// import Modal from "react-bootstrap/Modal";
// import { useParams } from "react-router-dom";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

const Likedlist = () => {
  const [Likeddata, setLikeddata] = useState([]);

  const getmylikedlist = async () => {
    var user_id = localStorage.getItem("user_id");
    var data = {
      user_id: user_id,
    };
    const res = await axios.post("http://localhost:1010/mylikedevents", data);
    // console.log(res);
    if (res?.data?.success === "yes") {
      setLikeddata(res.data.data);
    }
  };

  const like_or_dislike_event = async (event_id) => {
    var user_id = localStorage.getItem("user_id");
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
      NotificationManager.success("Deleted from list successfully.")
      // allevents();
      getmylikedlist();
    }
  };


  useEffect(() => {
    getmylikedlist();
    // getticketsleft();
  }, []);
  return (
    <div>
      {Likeddata.map((eventdata, index) => (
        <div className="maincon">
          <div>
            <img src={eventdata.image} alt="event images" className="imgcon" />
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
            {/* {ticketsleft.tickets_left !== 0 ? (
              <div className="tbook">
                <>
                  <Button variant="primary" onClick={()=>handleShow(eventdata.event_id)}>
                    Ticket Book
                  </Button>
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Book Ticket</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <span>Enter Number of Quantity:</span>
                          <span style={{ marginRight: "20px" }}>
                            {Qty * eventdata.entry_fee}&#8377;
                          </span>
                        </div>
                        <input
                          type="number"
                          value={Qty}
                          style={{ width: "100%" }}
                          onChange={(e) => setQty(e.target.value)}
                        />
                      </Form>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        variant="primary"
                        onClick={() => handlebook(eventdata.event_id)}
                        style={{ width: "100%" }}
                      >
                        Book
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={handleClose}
                        style={{ width: "100%" }}
                      >
                        Close
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </>
              </div>
            ) : (
           
            )} */}
             <Button variant="primary" className="fulbtn" size="lg" onClick={()=>{window.location.href="/eventdetail/"+ eventdata.event_id}} style={{cursor:"pointer"}} >
               Check details
            </Button>
            <div className="tlikedcont">
              <div>
                <Button
                  variant="primary"
                  className="fulbtn"
                  size="lg"
                  style={{ cursor: "pointer" }}
                  onClick={() => like_or_dislike_event(eventdata.event_id)}
                >
                  Remove From List
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
      <NotificationContainer />
    </div>
  );
};

export default Likedlist;
