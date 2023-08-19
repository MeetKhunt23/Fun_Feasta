const Event = require("../model/event.js");
var moment = require("moment");

exports.getallevents = (req, res) => {
  // console.log(current_month); return false
  // https://stackoverflow.com/questions/9032047/how-to-select-only-date-from-a-datetime-field-in-mysql
  const{user_id}=req.body;
  var uid = 0;
  if(user_id!=undefined && user_id!=""){
    uid=user_id;
  }

  var datetime = new Date();
  let nowdate = moment(datetime);
  var current_date =(nowdate.format("YYYY-MM-DD"));
  // current_date.toString();
  let nowtime = moment(datetime);
  var current_time = nowtime.format("hh:mm:ss");
  //  console.log(current_date); return false

  Event.getallevents(current_date,uid, (err, data) => {
    if (data) {
      data.forEach((pro) => {
        pro.event_date = moment(pro.event_date).format("YYYY-MM-DD");
      });
      return res.send({
        success: "yes",
        message: "here is yout all event data.",
        data: data,
      });
    } else {
      return res.send({
        success: "no",
        message: "Something happened wrong.",
        data: [],
      });
    }
  });
};

exports.geteventdetails = (req, res) => {
  const { event_id,user_id} = req.body;
  let errors = "";
  if (!event_id) {
    errors = " event_id is required.";
  }
  var uid = 0;
  if(user_id!=undefined && user_id!=""){
    uid=user_id;
  }
  
  // console.log(req.body); return false
  if (errors.length > 0) {
    return res.send({
      success: "no",
      message: errors,
      data: [],
    });
  }

  Event.getdetailbyid(event_id,uid,(err, data) => {
    if (data) {
      data.event_date=moment(data.event_date).format("YYYY-MM-DD");
      return res.send({
        success: "yes",
        message: "here are all data of this event",
        data: data,
      });
    } else {
      return res.send({
        success: "no",
        message: "no data available on this event",
        data: [],
      });
    }
  });
};

exports.deleteevent = (req, res) => {
  const { event_id } = req.body;
  let errors = "";
  if (!event_id) {
    errors = " event_id is required.";
  }

  // console.log(req.body); return false
  if (errors.length > 0) {
    return res.send({
      success: "no",
      message: errors,
      data: [],
    });
  }

  Event.deleteevent(event_id, (err, data) => {
    if (data) {
      return res.send({
        success: "yes",
        message: "event deleted successfully",
        data: [],
      });
    }
  });
};
