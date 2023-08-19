const sql = require("./db.js");

//constructor
const Event = function (event) {
  this.id = event.id;
  this.event_name = event.event_name;
  this.image = event.image;
  this.entry_fee = event.entry_fee;
  this.event_date = event.event_date;
  this.event_time=event.event_time;
  this.event_place = event.event_place;
  this.contact_person = event.contact_person;
  this.contact_no = event.contact_no;
  this.capacity=event.capacity;
};

Event.addevent = (eventdata, result) => {
  sql.query(`INSERT INTO events SET ?`, [eventdata], (err, res) => {
    // console.log(res); return false;
    result(null, res.insertId);
    return;
  });
};

Event.findeventexist = (event_id, event_name, result) => {
  sql.query(
    `SELECT * FROM events WHERE id=? AND event_name=?`,
    [event_id, event_name],
    (err, res) => {
      // console.log(res); return false
      result(null, res[0]);
      return;
    }
  );
};

Event.updateevent = (
  ev_id,
  event_name,
  filename,
  entry_fee,
  event_date,
  event_place,
  contact_person,
  contact_no,
  capacity,
  result
) => {
  sql.query(
    `UPDATE events SET event_name=?,image=?,entry_fee=?,event_date=?,event_place=?,contact_person=?,contact_no=?,capacity=? WHERE id=?`,
    [
      event_name,
      filename,
      entry_fee,
      event_date,
      event_place,
      contact_person,
      contact_no,
      capacity,
      ev_id,
    ],
    (err, res) => {
      // console.log(res); return false
      result(null, ev_id);
      return;
    }
  );
};

Event.getallevents = (current_date,user_id,result) => {
  sql.query(`SELECT *,if(image !='',CONCAT('`+ nodeSiteUrl + `','/file/event_image/',image),'') AS image,if((SELECT COUNT(id) FROM liked_events WHERE events.id=liked_events.event_id AND user_id=${user_id})>0,1,0) as is_liked FROM events WHERE event_date>='${current_date}'`,(err,res)=>{
    // console.log(err); return false;
    result(null,res)
    return;
  });
};

Event.getdetailbyid=(event_id,user_id,result)=>{
  sql.query(`SELECT *,if(image !='',CONCAT('`+ nodeSiteUrl + `','/file/event_image/',image),'') AS image,if((SELECT COUNT(id) FROM liked_events WHERE events.id=liked_events.event_id AND user_id=${user_id})>0,1,0) as is_liked FROM events WHERE id=${event_id}`,(err,res)=>{
    // console.log(res); return false
    result(null,res[0])
    return;
  })
}

Event.deleteevent=(event_id,result)=>{
  sql.query(`DELETE FROM events WHERE id=${event_id}`,(err,res)=>{
    result(null,event_id)
    return;
  })
}

module.exports = Event;
