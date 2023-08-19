import React, { useEffect, useState } from "react";
import axios from "axios";
import "./admineventtickets.css";
import { useParams } from "react-router-dom";

const Admineventtickets = () => {
  const id = useParams();
  const [eventdata, setEventdata] = useState([]);
  const [eventname, setEventname] = useState("");
  const [ticketsleft, setTicketsleft] = useState("");   
  const [totaltickets, setTotaltickets] = useState("");

  const getticektsbyid = async (event_id) => {
    var data = {
      event_id: id.id,
    };
    const res = await axios.post(
      "http://localhost:1010/showeventtickets",
      data
    );
    console.log(res);
    if (res?.data?.success === "yes") {
      setEventdata(res?.data?.data);
    }
  };

  const getticketsleft = async (event_id) => {
    var data = {
      event_id: id.id,
    };
    const res = await axios.post("http://localhost:1010/ticketyettosold", data);
    console.log(res);
    if (res?.data?.success === "yes") {
      setTicketsleft(res.data.data.tickets_left);
      setTotaltickets(res.data.data.total_tickets);
    }
  };

  useEffect(() => {
    getticektsbyid();
    getticketsleft();
  }, []);
  return (
    <>
      {!eventdata.length ? (
        <h1>No Tickets sold.</h1>
      ) : (
        <div className="container_t">
          <div className="details">
            <h3>{eventdata[0]?.event_name}</h3>
            <h3>
              {ticketsleft}/{totaltickets}
            </h3>
          </div>
          <>
            {eventdata.map((pro, index) => (
              <div className="small-con" key={index}>
                <h5>
                  Name :&nbsp;{pro.first_name} {pro.last_name}
                </h5>
                <h5>Quantity :&nbsp;{pro.quantity}</h5>
                <h5>Total : {pro.total}&#8377; </h5>
                <h5>Country : {pro.country_name}</h5>
              </div>
            ))}
          </>
        </div>
      )}
    </>
  );
};

export default Admineventtickets;
