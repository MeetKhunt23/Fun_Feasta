module.exports = (app) => {
    var router = require("express").Router();
    const fileUpload = require("express-fileupload");
    app.use(fileUpload());
    const comment = require("../controller/comment.js");
    app.post("/post_comment",comment.post_comment);
    app.post("/getcommentsbyevent",comment.getcommentsbyevent);
    // app.post("/geteventdetails",likes.geteventdetails);
    // app.post("/deleteevent",likes.deleteevent);
  };