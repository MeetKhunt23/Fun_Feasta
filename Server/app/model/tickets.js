const sql = require("./db.js");
var moment = require("moment");

const Ticket = function (ticket) {
  this.event_id = ticket.event_id;
  this.user_id = ticket.user_id;
  this.quantity = ticket.quantity;
  this.total = ticket.total;
};

Ticket.getticketdetail = (event_id, result) => {
  sql.query(
    `SELECT capacity,entry_fee FROM events WHERE id=${event_id}`,
    (err, res) => {
      // console.log(res); return false
      result(null, res[0]);
      return;
    }
  );
};

Ticket.checkbookedtickets = (event_id, result) => {
  sql.query(
    `SELECT SUM(quantity) as booked_tickets FROM tickets WHERE event_id=${event_id} AND status=1`,
    (err, res) => {
      // console.log(res); return false
      result(null, res[0]);
      return;
    }
  );
};

Ticket.checkbookedornot = (user_id, event_id, result) => {
  sql.query(
    `SELECT * FROM tickets WHERE user_id=${user_id} AND event_id=${event_id} AND status=1`,
    (err, res) => {
      // console.log(res); return false
      result(null, res[0]);
      return;
    }
  );
};

Ticket.bookticket = (user_id, event_id, quantity, status, total, result) => {
  sql.query(
    `INSERT INTO tickets SET event_id=${event_id},quantity=${quantity},status=${status},user_id=${user_id},total=${total}`,
    (err, res) => {
      result(null, res.insertId);
      return;
    }
  );
};

Ticket.updateticket = (user_id, event_id, newquantity, newtotal, result) => {
  sql.query(
    `UPDATE tickets SET quantity=${newquantity},total=${newtotal} WHERE user_id=${user_id} AND event_id=${event_id}`,
    (err, res) => {
      result(null, user_id);
      return;
    }
  );
};

Ticket.showlistofbookedtickets = (event_id, result) => {
  sql.query(
    `SELECT t.id as ticket_id,t.user_id,t.event_id,t.quantity,t.total,e.event_name,e.entry_fee,e.capacity,u.first_name,u.last_name,u.mobile FROM tickets as t LEFT JOIN events as e ON e.id=t.event_id LEFT JOIN users as u ON u.id=t.user_id WHERE t.event_id=${event_id}`,
    (err, res) => {
      // console.log(res); return false;
      result(null, res);
      return;
    }
  );
};

Ticket.getdetailsofticket = (ticket_id, result) => {
  sql.query(
    `SELECT quantity FROM tickets WHERE id=${ticket_id}`,
    (err, res) => {
      // console.log(res); return false;
      result(null, res[0]);
      return;
    }
  );
};

Ticket.cancelticketbyid = (ticket_id,quantity, result) => {
  sql.query(`UPDATE tickets SET status='0' WHERE id=${ticket_id} AND quantity=${quantity}`, (err, res) => {
    result(null, ticket_id);
    return;
  });
};

Event.getticketidbyuser = (user_id, event_id, result) => {
  sql.query(
    `SELECT id,quantity,total FROM tickets WHERE user_id=${user_id} AND event_id=${event_id}`,
    (err, res) => {
      result(null, res[0]);
      return;
    }
  );
};

Event.updatetquantity = (tid, quantity, total, result) => {
  sql.query(
    `UPDATE tickets SET quantity=${quantity},total=${total} WHERE id=${tid}`,
    (err, res) => {
      result(null, tid);
      return;
    }
  );
};

Ticket.getmyticketdetails = (user_id, type, result) => {
  var event_date;
  var status;
  var datetime = new Date();
  let nowdate = moment(datetime);
  var current_date = nowdate.format("YYYY-MM-DD");
  let nowtime = moment(datetime);
  var current_time = nowtime.format("hh:mm:ss");
  var typeword;
  if (type == "future") {
    typeword = `'${current_date}' < event_date AND status='1'`;
  } else if (type == "today") {
    typeword = `'${current_date}'=event_date AND status='1'`;
  } else if (type == "past") {
    typeword = `'${current_date}' > event_date AND status='1'`;
  } else if (type == "cancel") {
    typeword = `status=0`;
  }
  sql.query(
    `SELECT t.*,e.event_name,if(e.image !='',CONCAT('` +
      nodeSiteUrl +
      `','/file/event_image/',e.image),'') as event_image,e.entry_fee,e.event_date,e.event_place,e.contact_person,e.contact_no FROM tickets as t LEFT JOIN events as e ON e.id=t.event_id WHERE user_id=${user_id} AND (${typeword}) ORDER BY t.id DESC`,
    (err, res) => {
      // console.log(res); return false
      result(null, res);
      return;
    }
  );
};

Ticket.getticketsbyid = (event_id, result) => {
  sql.query(
    `SELECT t.*,u.first_name,u.last_name,u.mobile,u.email,c.name as country_name,s.name as state_name,ct.name as city_name,e.event_name,e.entry_fee,e.event_date,event_place,e.capacity FROM tickets as t LEFT JOIN events as e ON e.id=t.event_id LEFT JOIN users as u ON u.id=t.user_id LEFT JOIN countries as c ON u.country_id=c.id LEFT JOIN states as s ON u.state_id=s.id LEFT JOIN cities as ct ON u.city_id=ct.id WHERE t.event_id=${event_id} AND status=1`,
    (err, res) => {
      // console.log(err); return false
      result(null, res);
      return;
    }
  );
};

Ticket.getlefttickets = (event_id, result) => {
  sql.query(
    `SELECT SUM(t.quantity) as tickets_booked,e.capacity FROM tickets as t LEFT JOIN events as e ON e.id=t.event_id WHERE t.event_id=${event_id} AND status=1`,
    (err, res) => {
      // console.log(res); return false
      result(null, res[0]);
      return;
    }
  );
};

Ticket.getcapacitybyid = (event_id, result) => {
  sql.query(`SELECT capacity FROM events WHERE id=${event_id}`, (err, res) => {
    // console.log(res); return false
    result(null, res[0]);
    return;
  });
};
module.exports = Ticket;
