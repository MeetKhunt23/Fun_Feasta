module.exports = (app) => {
  var router = require("express").Router();
  const fileUpload = require("express-fileupload");
  app.use(fileUpload());
  const event = require("../controller/event.js");
  app.post("/getallevents",event.getallevents);
  app.post("/geteventdetails",event.geteventdetails);
  app.post("/deleteevent",event.deleteevent);
};
