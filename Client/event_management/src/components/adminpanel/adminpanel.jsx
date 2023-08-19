import React,{useEffect,useState} from 'react'
import axios from "axios";
import "./adminpanel.css"
import DateObject from "react-date-object"


const Adminpanel = () => {
    const [eventdata, setEventdata] = useState([]);

  const allevents = async () => {
    var date = new DateObject().format("DD-MM-YYYY");
    console.log("date",date);
    var obj={
      date:date
    }
    const res = await axios.post("http://localhost:1010/getallevents",obj);
    console.log(res);
    if (res?.data?.success === "yes") {
      setEventdata(res?.data?.data);
    }
  };

  useEffect(() => {
    allevents();
  }, []);
  return (
    <>
    <div><h1>Event Tickets</h1></div>
     <div className="cont">
      {
        eventdata.map((pro,inex)=>(
            <>
            <h5 className='event' onClick={()=>{window.location.href = "/admineventtickets/" + pro.id}}>{pro.event_name}</h5>
            </>
        ))
      }
    </div>
    </>
   
  )
}

export default Adminpanel
