const Ticket = require("../model/tickets.js");
var moment = require("moment");


exports.booktickets = (req, res) => {
  const { user_id, event_id, quantity } = req.body;

  let errors = "";
  if (!event_id) {
    errors = " event_id is required.";
  } else if (!user_id) {
    errors = " user_id is required.";
  } else if (!quantity) {
    errors = " quantity is required.";
  }

  // console.log(req.body); return false
  if (errors.length > 0) {
    return res.send({
      success: "no",
      message: errors,
      data: [],
    });
  }
  var status=1;
  Ticket.getticketdetail(event_id, (err, tcap) => {
    if (tcap) {
      const tcapacity = tcap.capacity;
      const tfees = tcap.entry_fee;
      //   console.log(tcapacity); return false
      Ticket.checkbookedtickets(event_id, (err, tbooked) => {
        if (tbooked) {
          const tbookedall = tbooked.booked_tickets;
          //   console.log(tbookedall); return false;
          const tavailable = Number(tcapacity) - Number(tbookedall);
          //   console.log(tavailable); return false

          if (quantity > tavailable) {
            return res.send({
              success: "no",
              message: `${tavailable} tickets are available right now`,
              data: [],
            });
          } else {
            var total = quantity * tfees;
            Ticket.checkbookedornot(user_id, event_id, (err, tcdata) => {
              // console.log(tcdata); return false
              if (tcdata) {
                var oldquantity = tcdata.quantity;
                var oltotal = tcdata.total;
                var newquantity = oldquantity + Number(quantity);
                // console.log(newquantity); return false
                var newtotal = oltotal + total;
                // console.log(newtotal); return false
                Ticket.updateticket(
                  user_id,
                  event_id,
                  newquantity,
                  newtotal,
                  (err, updateticket) => {
                    if (updateticket) {
                      return res.send({
                        success: "yes",
                        message: "your tickets are updated successfully.",
                        data: user_id,
                      });
                    }
                  }
                );
              } else {
                Ticket.bookticket(
                  user_id,
                  event_id,
                  quantity,
                  status,
                  total,
                  (err, data) => {
                    if (data) {
                      return res.send({
                        success: "yes",
                        message: "Your Tickets are booked successfully.",
                        data: data,
                      });
                    } else {
                      return res.send({
                        success: "yes",
                        message: "Something went wrong.",
                        data: [],
                      });
                    }
                  }
                );
              }
            });
          }
        }
      });
    }
  });
};

exports.showbookedtickets = (req, res) => {
  const { event_id } = req.body;
  let error = "";
  if (!event_id) {
    error = "event_id is required.";
  }

  if (error.length > 0) {
    return res.send({
      success: "no",
      message: error,
      data: [],
    });
  }

  Ticket.showlistofbookedtickets(event_id, (err, data) => {
    if (data.length) {
      return res.send({
        success: "yes",
        message: "Here is your list",
        data: data,
      });
    } else {
      return res.send({
        success: "no",
        message: "No data are available.",
        data: data,
      });
    }
  });
};

exports.canceltickets = (req, res) => {
  const { ticket_id,quantity } = req.body;
  let errors = "";
  if (!ticket_id) {
    errors = " ticket_id is required.";
  }else if (!quantity) {
    errors = " quantity is required.";
  }

  // console.log(req.body); return false
  if (errors.length > 0) {
    return res.send({
      success: "no",
      message: errors,
      data: [],
    });
  }

  Ticket.getdetailsofticket(ticket_id,(err, tickt_data) => {
    if (tickt_data) {
      Ticket.cancelticketbyid(ticket_id,quantity, (err, cancledata) => {
        if (cancledata) {
          return res.send({
            success: "yes",
            message:
              "Your Ticket has been cancled and 20% cancel charges will be deducted from refund amount.",
            data: [],
          });
        }
      });
    } else {
      return res.send({
        success: "no",
        message: "ticket does not exist.",
        data: [],
      });
    }
  });
};

exports.changeticketquantity = (req, res) => {
  const { user_id, event_id, quantity } = req.body;

  let errors = "";
  if (!user_id) {
    errors = " user_id is required.";
  } else if (!event_id) {
    errors = " event_id is required.";
  } else if (!quantity) {
    errors = " quantity is required.";
  }

  // console.log(req.body); return false
  if (errors.length > 0) {
    return res.send({
      success: "no",
      message: errors,
      data: [],
    });
  }

  Event.getticketidbyuser(user_id, event_id, (err, tdata) => {
    if (tdata) {
      //  console.log(tdata); return false
      Ticket.getticketdetail(event_id, (err, tdetail) => {
        // console.log(tdetail); return false
        var tid = tdata.id;
        var qty = tdata.quantity + Number(quantity);
        var total = tdetail.entry_fee * qty;
        // console.log(total) ; return false;

        Ticket.getticketdetail(event_id, (err, tcap) => {
          if (tcap) {
            const tcapacity = tcap.capacity;
            const tfees = tcap.entry_fee;

            Ticket.checkbookedtickets(event_id, (err, tbooked) => {
              const tbookedall = tbooked.booked_tickets;
              //   console.log(tbookedall); return false;
              const tavailable = Number(tcapacity) - Number(tbookedall);
              // console.log(tavailable); return false

              if (quantity > tavailable) {
                return res.send({
                  success: "no",
                  message: `${tavailable} tickets are available right now`,
                  data: [],
                });
              } else {
                Event.updatetquantity(tid, qty, total, (err, data) => {
                  if (data) {
                    return res.send({
                      success: "yes",
                      message: "qauntity updated successfully.",
                      data: data,
                    });
                  } else {
                    return res.send({
                      success: "no",
                      message: "something went wrong.",
                      data: [],
                    });
                  }
                });
              }
            });
            //    console.log(total); return false
          }
        });
      });
    }
  });
};

exports.showmybookings = (req, res) => {
  const { user_id,type } = req.body;
  let errors = "";
  if (!user_id) {
    errors = " user_id is required.";
  } else if (!type) {
    errors = " type is required.";
  }
  // console.log(req.body); return false
  if (errors.length > 0) {
    return res.send({
      success: "no",
      message: errors,
      data: [],
    });
  }

  Ticket.getmyticketdetails(user_id,type, (err, newdata) => {
    if (newdata.length) {
      newdata.forEach((pro) => {
        pro.event_date = moment(pro.event_date).format("YYYY-MM-DD");
      });
      // console.log(newdata[2].event_date); return false
      return res.send({
        success: "yes",
        message: "here are your all ticket data.",
        data: newdata,
      });
    } else {
      return res.send({
        success: "no",
        message: "No tickets booked",
        data: [],
      });
    }
  });
};

exports.showticketsbyeventid = (req, res) => {
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

  Ticket.getticketsbyid(event_id, (err, data) => {
    if (data) {
      return res.send({
        success: "yes",
        message: "here is all tickets of event",
        data: data,
      });
    } else {
      return res.send({
        success: "no",
        message: "something went wrong",
        data: [],
      });
    }
  });
};

exports.ticketyettosold = (req, res) => {
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

  Ticket.getlefttickets(event_id, (err, data) => {
    var obj = {};
    if (data.tickets_booked != null) {
      var booked = data.tickets_booked;
      var capacity = data.capacity;
      var left = Number(capacity) - Number(booked);
      obj["total_booked"] = booked;
      obj["tickets_left"] = left;
      obj["total_tickets"] = capacity;
      return res.send({
        success: "yes",
        message: "here is number of left tickets.",
        data: obj,
      });
    } else if (data.tickets_booked == null) {
      Ticket.getcapacitybyid(event_id, (err, cdata) => {
        if (cdata) {
          obj["total_tickets"] = cdata.capacity;
          return res.send({
            success: "yes",
            message: "No tickets Sold",
            data: obj,
          });
        }
      });
    }
  });
};

exports.oldtickets = (req, res) => {
  const { user_id, date } = req.body;
  let errors = "";
  if (!user_id) {
    errors = " user_id is required.";
  } else if (!date) {
    errors = " date is required.";
  }
  // console.log(req.body); return false
  if (errors.length > 0) {
    return res.send({
      success: "no",
      message: errors,
      data: [],
    });
  }
  var current_date = date.split("-")[0];
  var current_month = date.split("-")[1];
  var current_year = date.split("-")[2];
  // console.log(current_date,current_month,current_year); return false

  Ticket.getmyticketdetails(user_id, (err, oldticket) => {
    if (oldticket) {
      // console.log(oldticket[2].event_date); return false
      var array = [];
      oldticket.forEach((pro) => {
        var obj = {};
        if (pro.event_date.split("-")[2] <= current_year) {
          if (pro.event_date.split("-")[1] < current_month) {
            obj["id"] = pro.id;
            obj["user_id"] = pro.user_id;
            obj["event_id"] = pro.event_id;
            obj["quantity"] = pro.quantity;
            obj["total"] = pro.total;
            obj["event_image"] = pro.event_image;
            obj["event_name"] = pro.event_name;
            obj["image"] = pro.image;
            obj["entry_fee"] = pro.entry_fee;
            obj["event_place"] = pro.event_place;
            obj["contact_person"] = pro.contact_person;
            obj["contact_no"] = pro.contact_no;
            obj["capacity"] = pro.capacity;
            obj["event_date"] = pro.event_date;
            array.push(obj);
          } else if (pro.event_date.split("-")[1] == current_month) {
            if (pro.event_date.split("-")[0] <= current_date) {
              obj["id"] = pro.id;
              obj["user_id"] = pro.user_id;
              obj["event_id"] = pro.event_id;
              obj["quantity"] = pro.quantity;
              obj["total"] = pro.total;
              obj["event_image"] = pro.event_image;
              obj["event_name"] = pro.event_name;
              obj["image"] = pro.image;
              obj["entry_fee"] = pro.entry_fee;
              obj["event_place"] = pro.event_place;
              obj["contact_person"] = pro.contact_person;
              obj["contact_no"] = pro.contact_no;
              obj["capacity"] = pro.capacity;
              obj["event_date"] = pro.event_date;
              array.push(obj);
            }
          }
        }
      });
      return res.send({
        success: "yes",
        message: "here is yout all ticket data.",
        data: array,
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
