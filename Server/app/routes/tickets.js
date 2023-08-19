module.exports = (app) => {
    var router = require("express").Router();
    const fileUpload = require("express-fileupload");
    app.use(fileUpload());
    const ticket = require("../controller/tickets.js");
    app.post("/booktickets",ticket.booktickets);
    app.post("/changeticketquantity",ticket.changeticketquantity);
    app.post("/canceltickets",ticket.canceltickets);
    app.get("/showbookedtickets",ticket.showbookedtickets);
    app.post("/showmybookings",ticket.showmybookings);
    app.post("/showeventtickets",ticket.showticketsbyeventid);
    app.post("/ticketyettosold",ticket.ticketyettosold);
  };