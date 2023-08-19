module.exports = (app) => {
    var router = require("express").Router();
    const fileUpload = require("express-fileupload");
    app.use(fileUpload());
    const likes = require("../controller/liked_events.js");
    app.post("/like_or_dislike_event",likes.like_or_dislike_event);
    app.post("/count_likes",likes.count_likes);
    app.post("/mylikedevents",likes.mylikedevents);
    // app.post("/geteventdetails",likes.geteventdetails);
    // app.post("/deleteevent",likes.deleteevent);
  };