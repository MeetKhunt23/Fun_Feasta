import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

function Example(props) {
  const [show, setShow] = useState(false);
  const [Qty, setQty] = useState("");
  const id = useParams();
  // const [eventdata, setEventdata] = useState({});

  const handleClose = () => {
    setShow(false);
  };

  const bookticket = async () => {
    var uid = localStorage.getItem("user_id");
    if (Qty <= 0) {
      NotificationManager.error("Enter Qauntity Greater than 0");
    } else {
      var data = {
        user_id: uid,
        event_id: props.event_id,
        quantity: Qty,
      };

      const res = await axios.post("http://localhost:1010/booktickets", data);
      console.log(res);
      if (res?.data?.success === "yes") {
        setShow(false);
        NotificationManager.success("Your Tickets are Booked");
        if (props.loading) {
          window.location.reload();
        }
      } else if (res?.data?.message === "0 tickets are available right now") {
        NotificationManager.error("House is Full..!!");
      } else {
        NotificationManager.error(res?.data?.message);
      }
    }
  };

  const handlebook = () => {
    if (Qty === "" || Qty === 0) {
      NotificationManager.error("kinly Enter Quantity");
    } else {
      bookticket();
    }
  };

  const handleShow = () => {
    if (!localStorage.getItem("isLoggedIn")) {
      window.location = "/login";
    }else{
      setShow(true);
    }
  }

  const Geteventdetail = async () => {
    var page = {
      event_id: id.id,
    };
    const res = await axios.post("http://localhost:1010/geteventdetails", page);
    console.log(res);
    if (res?.data?.success === "yes") {
      // setEventdata(res?.data?.data);
    }
  };

  useEffect(() => {
    Geteventdetail();
  }, []);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        {props.buttonname}
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Book Ticket</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Enter Number of Quantity:</span>
              <span style={{ marginRight: "20px" }}>
                {Qty * props.entry_fee}&#8377;
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
            onClick={handlebook}
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

      <NotificationContainer />
    </>
  );
}

export default Example;
