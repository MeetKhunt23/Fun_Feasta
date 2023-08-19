import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import $ from "jquery";
import Messages from "../constants/messages.js";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import axios from "axios";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

const Addevent = () => {
  const navigate = useNavigate();
  const [Event_name, setEvent_name] = useState("");
  const [Event_fees, setEvent_fees] = useState("");
  const [Event_date, setEvent_date] = useState("");
  const [Event_time, setEvent_time] = useState("");
  const [Event_place, setEvent_place] = useState("");
  const [Event_organizer, setEvent_organizer] = useState("");
  const [Organizer_contact, setOrganizer_contact] = useState("");
  const [Capacity, setCapacity] = useState("");
  const [errors, setErrors] = useState(true);
  const [pfile, setPfile] = useState("");

  const hidemsg = (hide) => {
    $("#" + hide).html("");
  };

  const HandleValidation_Register = () => {
    if ($("#event_name").val() === "") {
      $("#event_name_error").html(Messages.event_name_msg);
      setErrors(true);
    } else {
      setErrors(false);
      $("#event_name_error").html("");
    }

    if ($("#event_fees").val() === "") {
      $("#event_fee_error").html(Messages.event_fees_msg);
      setErrors(true);
    } else {
      setErrors(false);
      $("#event_fee_error").html("");
    }

    if ($("#event_date").val() === "") {
      $("#event_date_error").html(Messages.event_date_msg);
      setErrors(true);
    } else {
      setErrors(false);
      $("#event_date_error").html("");
    }
    
    if ($("#event_time").val() === "") {
      $("#event_time_error").html(Messages.event_time_msg);
      setErrors(true);
    } else {
      setErrors(false);
      $("#event_time_error").html("");
    }

    if ($("#event_place").val() === "") {
      $("#event_place_error").html(Messages.event_place_msg);
      setErrors(true);
    } else {
      setErrors(false);
      $("#event_place_error").html("");
    }

    if ($("#organizer_name").val() === "") {
      $("#organizer_name_error").html(Messages.organizer_name_msg);
      setErrors(true);
    } else {
      setErrors(false);
      $("#organizer_name_error").html("");
    }

    if ($("#organizer_contact").val() === "") {
      $("#organizer_contact_error").html(Messages.organizer_contact_msg);
      setErrors(true);
    } else {
      setErrors(false);
      $("#organizer_contact_error").html("");
    }

    if ($("#capacity").val() === "") {
      $("#capacity_error").html(Messages.capacity_msg);
      setErrors(true);
    } else {
      setErrors(false);
      $("#capacity_error").html("");
    }

    if ($("#profile_pic").val() === "") {
      $("#profile_pic_error").html(Messages.profile_pic_msg);
      setErrors(true);
    } else {
      setErrors(false);
      $("#profile_pic_error").html("");
    }
  };

  const formsubmit = async (e) => {
    e.preventDefault();
    HandleValidation_Register();
    if (errors == false) {
      const formData = new FormData();
      formData.append("event_name", Event_name);
      formData.append("entry_fee", Event_fees);
      formData.append("event_date", Event_date);
      formData.append("event_time", Event_time);
      formData.append("event_place", Event_place);
      formData.append("contact_person", Event_organizer);
      formData.append("contact_no", Organizer_contact);
      formData.append("capacity", Capacity);
      formData.append("image", pfile);

      
      const res = await axios.post(
        "http://localhost:1010/event/addevent",
        formData
      );
      if (res.data.success === "yes") {
        NotificationManager.success("Event added successfully.");
        navigate("/");
      }
    }
  };

  return (
    <div>
      <div className="container">
        <h2 className="formheading">Add Event</h2>
        <span
          style={{
            width: "70%",
            fontSize: "16px",
            marginLeft: "15%",
            marginBottom: "15px",
          }}
        >
          <Form.Control
            size="lg"
            name="event_name"
            type="text"
            id="event_name"
            onKeyDown={() => {
              hidemsg("event_name_error");
            }}
            onChange={(e) => setEvent_name(e.target.value)}
            className="input-field"
            placeholder="Enter Event Name"
          />
          <span id="event_name_error" className="text-danger"></span>
        </span>
        <span
          style={{
            width: "70%",
            fontSize: "16px",
            marginLeft: "15%",
            marginBottom: "15px",
          }}
        >
          <Form.Control
            size="lg"
            name="event_fees"
            type="text"
            id="event_fees"
            onKeyDown={() => {
              hidemsg("event_fee_error");
            }}
            onChange={(e) => setEvent_fees(e.target.value)}
            className="input-field"
            placeholder="Enter Event Fees"
          />
          <span id="event_fee_error" className="text-danger"></span>
        </span>
        <span
          style={{
            width: "70%",
            fontSize: "16px",
            marginLeft: "15%",
            marginBottom: "15px",
          }}
        ><label style={{display:"flex"}}>Event Date</label>
          <Form.Control
            size="lg"
            name="event_date"
            type="date"
            id="event_date"
            onKeyDown={() => {
              hidemsg("event_date_error");
            }}
            onChange={(e) => setEvent_date(e.target.value)}
            className="input-field"
            placeholder="Enter Event Date"
          />
          <span id="event_date_error" className="text-danger"></span>
        </span>
        <span
          style={{
            width: "70%",
            fontSize: "16px",
            marginLeft: "15%",
            marginBottom: "15px",
          }}
        ><label style={{display:"flex"}}>Event Time</label>
          <Form.Control
            size="lg"
            name="event_time"
            type="time"
            id="event_time"
            onKeyDown={() => {
              hidemsg("event_time_error");
            }}
            onChange={(e) => setEvent_time(e.target.value)}
            className="input-field"
            placeholder="Enter Event Time"
          />
          <span id="event_time_error" className="text-danger"></span>
        </span>
        <span
          style={{
            width: "70%",
            fontSize: "16px",
            marginLeft: "15%",
            marginBottom: "15px",
          }}
        >
          <Form.Control
            size="lg"
            name="event_place"
            type="text"
            id="event_place"
            onKeyDown={() => {
              hidemsg("event_place_error");
            }}
            onChange={(e) => setEvent_place(e.target.value)}
            className="input-field"
            placeholder="Enter Event Place"
          />
          <span id="event_place_error" className="text-danger"></span>
        </span>
        <span
          style={{
            width: "70%",
            fontSize: "16px",
            marginLeft: "15%",
            marginBottom: "15px",
          }}
        >
          <Form.Control
            size="lg"
            name="organizer_name"
            type="text"
            id="organizer_name"
            onKeyDown={() => {
              hidemsg("organizer_name_error");
            }}
            onChange={(e) => setEvent_organizer(e.target.value)}
            className="input-field"
            placeholder="Enter Organizer Name"
          />
          <span id="organizer_name_error" className="text-danger"></span>
        </span>
        <span
          style={{
            width: "70%",
            fontSize: "16px",
            marginLeft: "15%",
            marginBottom: "15px",
          }}
        >
          <Form.Control
            size="lg"
            name="organizer_contact"
            type="text"
            id="organizer_contact"
            onKeyDown={() => {
              hidemsg("organizer_contact_error");
            }}
            onChange={(e) => setOrganizer_contact(e.target.value)}
            className="input-field"
            placeholder="Enter Organizer Contact"
          />
          <span id="organizer_contact_error" className="text-danger"></span>
        </span>
        <span
          style={{
            width: "70%",
            fontSize: "16px",
            marginLeft: "15%",
            marginBottom: "15px",
          }}
        >
          <Form.Control
            size="lg"
            name="capacity"
            type="text"
            id="capacity"
            onKeyDown={() => {
              hidemsg("capacity_error");
            }}
            onChange={(e) => setCapacity(e.target.value)}
            className="input-field"
            placeholder="Enter Capacity of audience"
          />
          <span id="capacity_error" className="text-danger"></span>
        </span>
        <div className="space radiobutton">
          <br />
          <span>Insert profile picture ➡️</span>
          <input
            type="file"
            id="profile_pic"
            name="profile_pic"
            onChange={(e) => setPfile(e.target.files[0])}
            onClick={() => {
              hidemsg("profile_pic_error");
            }}
          />
          <span id="profile_pic_error" className="text-danger"></span>
        </div>
        <Button
          variant="primary"
          size="lg"
          onClick={(e) => formsubmit(e)}
          style={{ marginBottom: "40px" }}
        >
          Submit
        </Button>
      </div>
      <NotificationContainer/>
    </div>
  );
};

export default Addevent;
