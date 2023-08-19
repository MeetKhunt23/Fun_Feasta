import React, { useEffect, useState } from "react";
import axios from "axios";
import "./bookings.css";
import { AiFillCloseSquare } from "react-icons/ai";
import Model from "../singleevent/model.jsx";
import Loader from "../../assets/loadder.gif";
import DateObject from "react-date-object";
import Button from "react-bootstrap/Button";

const Bookings = () => {
  const [Todaytickets, setTodaytickets] = useState([]);
  const [Futuretickets, setFuturetickets] = useState([]);
  const [ShowCanceledtickets, setShowCanceledtickets] = useState([]);
  console.log("ShowCanceledtickets",ShowCanceledtickets);
  const [PastTickets, setPastTickets] = useState([]);
  const [loader, setLoader] = useState(false);
  const [Etoday, setEtoday] = useState(false);
  const [Efuture, setEfuture] = useState(false);
  const [Ecancel, setEcancel] = useState(false);
  const [Epast, setEpast] = useState(false);

  const gettodaystickets = async () => {
    var uid = localStorage.getItem("user_id");

    var data = {
      user_id: uid,
      type: "today",
    };
    const res = await axios.post("http://localhost:1010/showmybookings", data);
    if (res?.data?.success === "yes") {
      // window.location.reload();
      setTodaytickets(res?.data?.data);
      // console.log("cart",res)
    } else if (res.data.message === "No tickets booked") {
      setEtoday(true);
    }
  };

  const getfuturebookings = async () => {
    var uid = localStorage.getItem("user_id");
    var data = {
      user_id: uid,
      type: "future",
    };
    const res = await axios.post("http://localhost:1010/showmybookings", data);
    if (res?.data?.success === "yes") {
      // window.location.reload();
      setFuturetickets(res?.data?.data);
      // console.log("cart",res)
    } else if (res.data.message === "No tickets booked") {
      setEfuture(true);
    }
  };

  const getcanceledbookings = async () => {
    var uid = localStorage.getItem("user_id");
    var data = {
      user_id: uid,
      type: "cancel",
    };
    const res = await axios.post("http://localhost:1010/showmybookings", data);
    if (res?.data?.success === "yes") {
      setShowCanceledtickets(res?.data?.data);
      // console.log("cart",res)
    } else if (res.data.message === "No tickets booked") {
      setEcancel(true);
    }
  };

  const getpastbookings = async () => {
    var uid = localStorage.getItem("user_id");
    var data = {
      user_id: uid,
      type: "past",
    };
    const res = await axios.post("http://localhost:1010/showmybookings", data);
    if (res?.data?.success === "yes") {
      // window.location.reload();
      setPastTickets(res?.data?.data);
      // console.log("cart",res)
    } else if (res.data.message === "No tickets booked") {
      setEpast(true);
    }
  };

  const canceltodayticket = async (ticket_id, quantity) => {
    // if (quantity <= 0) {
    //   setLoader(true);
    // }
    var uid = localStorage.getItem("user_id");
    var data = {
      ticket_id: ticket_id,
      quantity: quantity,
    };
    const res = await axios.post("http://localhost:1010/canceltickets", data);
    if (res?.data?.success === "yes") {
      Todaytickets.slice(0, 1);
      gettodaystickets();
      getcanceledbookings();
      if(ShowCanceledtickets==0){
        setLoader(true)
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
      setLoader(false);
    }
  };

  const cancelfutureticket = async (ticket_id, quantity) => {
    if (quantity <= 0) {
      setLoader(true);
    }

    var uid = localStorage.getItem("user_id");
    var data = {
      ticket_id: ticket_id,
      quantity: quantity,
    };
    const res = await axios.post("http://localhost:1010/canceltickets", data);
    if (res?.data?.success === "yes") {
      getfuturebookings();
      getcanceledbookings();
      // Futuretickets.slice(0, 1);
      // setTimeout(() => {
      //   window.location.reload();
      if(ShowCanceledtickets==0){
        setLoader(true)
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }

      setLoader(false);
      // }, 1000);
    }
  };

  useEffect(() => {
    gettodaystickets();
    getfuturebookings();
    getcanceledbookings();
    getpastbookings();
  }, []);

  return (
    <>
      <div>
        <div
          style={{
            marginTop: "30px",
            fontSize: "25px",
            border: "2px solid grey",
            width: "50%",
            marginLeft: "25%",
            cursor: "pointer",
          }}
        >
          Today's Bookings
        </div>
        {Etoday ? (
          <span
            style={{
              color: "grey",
              fontSize: "25px",
              position: "relative",
              top: "10px",
            }}
          >
            No Bookings found
          </span>
        ) : (
          <div>
            {loader ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={Loader}
                  width="360px"
                  alt=""
                  height="350px"
                  margin="40px 40px"
                  className="mt-5 mb-5"
                />
              </div>
            ) : (
              <>
                {Todaytickets.map((pro, index) => (
                  <div className="maincon">
                    <div>
                      <img src={pro.event_image} className="imgcon" />
                    </div>
                    <div className="detailcon">
                      <h3>{pro.event_name}</h3>
                      <h5>Venue:&nbsp;{pro.event_place}</h5>
                      <h5>Date:&nbsp;{pro.event_date}</h5>
                      <h5>Organizer:&nbsp;{pro.contact_person}</h5>
                      <h5>Conatct:&nbsp;{pro.contact_no}</h5>
                      <h5>Entry Fees:&nbsp;{pro.entry_fee}&#8377; </h5>
                    </div>
                    <div>
                      <h5>
                        total booked tickets :{" "}
                        {pro.quantity > 0
                          ? pro.quantity
                          : canceltodayticket(pro.id, pro.quantity)}
                      </h5>
                      <Model
                            buttonname="Add Ticket"
                            event_id={pro.event_id}
                            entry_fee={pro.entry_fee}
                            loading={true}
                            state={Todaytickets}
                          />
                    </div>
                    <div>
                      <AiFillCloseSquare
                        style={{
                          position: "absolute",
                          top: "10px",
                          right: "10px",
                          fontSize: "30px",
                          cursor: "pointer",
                        }}
                        onClick={() => canceltodayticket(pro.id, pro.quantity)}
                      />
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        )}
      </div>
      <div>
        <div
          style={{
            marginTop: "30px",
            fontSize: "25px",
            border: "2px solid grey",
            width: "50%",
            marginLeft: "25%",
            cursor: "pointer",
          }}
        >
          Future Bookings
        </div>
        {Efuture ? (
          <span
            style={{
              color: "grey",
              fontSize: "25px",
              position: "relative",
              top: "10px",
            }}
          >
            No Bookings found
          </span>
        ) : (
          <div>
            {loader ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={Loader}
                  width="360px"
                  alt=""
                  height="350px"
                  margin="40px 40px"
                  className="mt-5 mb-5"
                />
              </div>
            ) : (
              <>
                <div>
                  {Futuretickets.map((pro, index) => (
                    <div className="maincon">
                      <div>
                        <img src={pro.event_image} className="imgcon" />
                      </div>
                      <div className="detailcon">
                        <h3>{pro.event_name}</h3>
                        <h5>Venue:&nbsp;{pro.event_place}</h5>
                        <h5>Date:&nbsp;{pro.event_date}</h5>
                        <h5>Organizer:&nbsp;{pro.contact_person}</h5>
                        <h5>Conatct:&nbsp;{pro.contact_no}</h5>
                        <h5>Entry Fees:&nbsp;{pro.entry_fee}&#8377; </h5>
                      </div>
                      <div>
                        <h5>
                          total booked tickets :
                          {pro.quantity > 0 ? pro.quantity : ""}
                          {/* // cancelticket(pro.id, pro.quantity) */}
                        </h5>

                        <Model
                          buttonname="Add Ticket"
                          event_id={pro.event_id}
                          entry_fee={pro.entry_fee}
                          loading={true}
                          state={Todaytickets}
                        />
                      </div>
                      <div>
                        <AiFillCloseSquare
                          style={{
                            position: "absolute",
                            top: "10px",
                            right: "10px",
                            fontSize: "30px",
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            cancelfutureticket(pro.id, pro.quantity)
                          }
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
      <div>
        <div
          style={{
            marginTop: "30px",
            fontSize: "25px",
            border: "2px solid grey",
            width: "50%",
            marginLeft: "25%",
            cursor: "pointer",
          }}
        >
          Canceled Bookings
        </div>
        {Ecancel ? (
          <span
            style={{
              color: "grey",
              fontSize: "25px",
              position: "relative",
              top: "10px",
            }}
          >
            No Bookings found
          </span>
        ) : (
          <div>
            {loader ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={Loader}
                  width="360px"
                  alt=""
                  height="350px"
                  margin="40px 40px"
                  className="mt-5 mb-5"
                />
              </div>
            ) : (
              <>
                <div>
                  {ShowCanceledtickets.map((pro, index) => (
                    <div className="maincon">
                      <div>
                        <img src={pro.event_image} className="imgcon" />
                      </div>
                      <div className="detailcon">
                        <h3>{pro.event_name}</h3>
                        <h5>Venue:&nbsp;{pro.event_place}</h5>
                        <h5>Date:&nbsp;{pro.event_date}</h5>
                        <h5>Organizer:&nbsp;{pro.contact_person}</h5>
                        <h5>Conatct:&nbsp;{pro.contact_no}</h5>
                        <h5>Entry Fees:&nbsp;{pro.entry_fee}&#8377; </h5>
                      </div>
                      <div>
                        <h5>
                          total booked tickets :
                          {pro.quantity > 0 ? pro.quantity : ""}
                          {/* // cancelticket(pro.id, pro.quantity) */}
                        </h5>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
      <div>
        <div
          style={{
            marginTop: "30px",
            fontSize: "25px",
            border: "2px solid grey",
            width: "50%",
            marginLeft: "25%",
            cursor: "pointer",
          }}
        >
          Past Bookings
        </div>
        {Epast ? (
          <span
            style={{
              color: "grey",
              fontSize: "25px",
              position: "relative",
              top: "10px",
            }}
          >
            No Bookings found
          </span>
        ) : (
          <div>
            {loader ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={Loader}
                  width="360px"
                  alt=""
                  height="350px"
                  margin="40px 40px"
                  className="mt-5 mb-5"
                />
              </div>
            ) : (
              <>
                <div>
                  {PastTickets.map((pro, index) => (
                    <div className="maincon">
                      <div>
                        <img src={pro.event_image} className="imgcon" />
                      </div>
                      <div className="detailcon">
                        <h3>{pro.event_name}</h3>
                        <h5>Venue:&nbsp;{pro.event_place}</h5>
                        <h5>Date:&nbsp;{pro.event_date}</h5>
                        <h5>Organizer:&nbsp;{pro.contact_person}</h5>
                        <h5>Conatct:&nbsp;{pro.contact_no}</h5>
                        <h5>Entry Fees:&nbsp;{pro.entry_fee}&#8377; </h5>
                      </div>
                      <div>
                        <h5>
                          total booked tickets :
                          {pro.quantity > 0 ? pro.quantity : ""}
                          {/* // cancelticket(pro.id, pro.quantity) */}
                        </h5>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Bookings;
