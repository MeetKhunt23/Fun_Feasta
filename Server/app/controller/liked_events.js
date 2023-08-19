const { resourceUsage } = require("process");
const Likes = require("../model/liked_events.js");

exports.like_or_dislike_event = (req, res) => {
  const { user_id, event_id } = req.body;
  let errors = "";
  if (!user_id) {
    errors = " user_id is required.";
  } else if (!event_id) {
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

  Likes.checklikedornot(user_id, event_id, (err, checkeddata) => {
    // console.log(checkeddata); return false
    if (checkeddata) {
      Likes.DeleteLike(user_id, event_id, (err, ddata) => {
        if (ddata) {
          return res.send({
            success: "yes",
            message: "Like deleted successfully.",
            data: [],
          });
        }
      });
    } else {
      const Likedobj = new Likes({
        user_id: user_id,
        event_id: event_id,
      });
      Likes.likeevent(Likedobj, (err, likeddata) => {
        if (likeddata) {
          return res.send({
            success: "yes",
            message: "Event Liked successfully.",
            data: [],
          });
        } else {
          return res.send({
            success: "no",
            message: "Something wrong happened.",
            data: [],
          });
        }
      });
    }
  });
};

exports.count_likes = (req, res) => {
  const { event_id } = req.body;
  let errors = "";
  if (!event_id) {
    errors = " event_id is required.";
  }

  if (errors.length > 0) {
    return res.send({
      success: "no",
      message: errors,
      data: [],
    });
  }

  Likes.getlikescountbyid(event_id, (err, ldata) => {
    if (ldata) {
      return res.send({
        success: "yes",
        message: "here are like numbers of this event",
        data: ldata,
      });
    }
  });
};

exports.mylikedevents = (req, res) => {
  const { user_id } = req.body;
  let errors = "";
  if (!user_id) {
    errors = " user_id is required.";
  }

  if (errors.length > 0) {
    return res.send({
      success: "no",
      message: errors,
      data: [],
    });
  }

  Likes.getmylikedevents(user_id, (err, data) => {
    if (data) {
      return res.send({
        success: "yes",
        message: "here is the list of liked posts.",
        data: data,
      });
    }
  });
};
