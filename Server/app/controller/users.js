const Users = require("../model/users.js");
const Event = require("../model/event.js");

const nodemailer = require("nodemailer");
const shah = require("js-sha512");

exports.signup = (req, res) => {
  const {
    first_name,
    last_name,
    mobile,
    email,
    password,
    gender,
    profile_picture,
    country_id,
    state_id,
    city_id,
  } = req.body;

  // console.log(req.body); return false

  let errors = "";
  if (!first_name) {
    errors = " first_name is required.";
  } else if (!last_name) {
    errors = "last_name  is required.";
  } else if (!mobile) {
    errors = "mobile  is required.";
  } else if (!email) {
    errors = "email  is required.";
  } else if (!password) {
    errors = "password  is required.";
  } else if (!gender) {
    errors = "gender  is required.";
  } else if (!country_id) {
    errors = "country_id  is required.";
  } else if (!state_id) {
    errors = "state_id  is required.";
  } else if (!city_id) {
    errors = "city_id  is required.";
  } else if (!req.files || Object.keys(req.files).length === 0) {
    return res.send({
      error: "yes",
      message: "Profile picture is required.",
      data: [],
    });
  }

  if (errors.length > 0) {
    return res.send({
      success: "no",
      message: errors,
      data: [],
    });
  }

  Users.mobileexist(mobile, (err, resss) => {
    // console.log(resss); return false
    if (resss) {
      return res.send({
        success: "no",
        message: "Mobile number already exists",
        data: [],
      });
    } else {
      Users.emailexist(email, (err, ress) => {
        if (ress) {
          return res.send({
            success: "no",
            message: "Email already exists",
            data: [],
          });
        } else {
          let userimage = req.files.profile_picture;
          var filename = Math.floor(Math.random() * 100000) + userimage.name;
          var filepath = "uploads/profile_image/" + filename;
          userimage.mv(filepath, function (err) {});

          Users.createuser(
            first_name,
            last_name,
            mobile,
            email,
            password,
            gender,
            filename,
            country_id,
            state_id,
            city_id,
            (err, data) => {
              let objj = {};
              objj["user_id"] = data;
              objj["first_name"] = first_name;
              objj["last_name"] = last_name;
              // console.log(data); return false
              if (data) {
                return res.send({
                  success: "yes",
                  message: "Sign up succcessfully.",
                  data: objj,
                });
              } else {
                return res.send({
                  success: "no",
                  message: "Something happen wrong.",
                  data: [],
                });
              }
            }
          );
        }
      });
    }
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  let errors = "";
  if (!email) {
    errors = "email id is required";
  } else if (!password) {
    errors = "password is required";
  }

  if (errors.length > 0) {
    return res.send({
      success: "no",
      message: errors,
      data: [],
    });
  }

  await Users.log_in(email, password, (err, resdata) => {
    // console.log(resdata); return false
    if (resdata) {
      return res.send({
        success: "yes",
        message: "Logged in succcessfully.",
        data: resdata,
      });
    } else {
      return res.send({
        success: "no",
        message: "No user registered.kindly sign-up",
        data: [],
      });
    }
  });
};

exports.user_info = (req, res) => {
  const { user_id } = req.body;
  let error = "";
  if (!user_id) {
    error = "user_id is required.";
  }

  if (error.length > 0) {
    return res.send({
      success: "no",
      message: error,
      data: [],
    });
  }

  Users.getuserinfo(user_id, (err, userdata) => {
    if (userdata) {
      var obj = {};
      obj["user_id"] = userdata.id;
      obj["full_name"] = `${userdata.first_name} ${userdata.last_name}`;
      obj["first_name"] = userdata.first_name;
      obj["last_name"] = userdata.last_name;
      obj["mobile"] = userdata.mobile;
      obj["email"] = userdata.email;
      obj["password"] = userdata.password;
      obj["gender"] = userdata.gender;
      obj["profile_picture"] = userdata.profile_picture;
      obj["country_id"] = userdata.country_id;
      obj["country_name"] = userdata.country_name;
      obj["state_id"] = userdata.state_id;
      obj["state_name"] = userdata.state_name;
      obj["city_id"] = userdata.city_id;
      obj["city_name"] = userdata.city_name;
      obj["device_type"] = userdata.device_type;
      obj["device_token"] = userdata.device_token;
    }

    return res.send({
      success: "yes",
      message: "aa le user ni kundli.",
      data: obj,
    });
  });
};

exports.updateprofile = (req, res) => {
  const { user_id, first_name, last_name, email, mobile, profile_picture } =
    req.body;
  let error = "";
  if (!user_id) {
    error = "user_id is required.";
  } else if (!first_name) {
    error = "first_name is required.";
  } else if (!last_name) {
    error = "last_name is required.";
  } else if (!email) {
    error = "email is required.";
  } else if (!mobile) {
    error = "mobile is required.";
  }

  if (error.length > 0) {
    return res.send({
      success: "no",
      message: error,
      data: [],
    });
  }

  Users.finduserexist(user_id, email, (err, userdata) => {
    if (userdata) {
      return res.send({
        success: "no",
        message: "email allready exists.",
        data: [],
      });
    }

    let userimage = req.files.profile_picture;
    // console.log(userimage); return false
    var filename = userimage.name;
    var filepath = "uploads/profile_image/" + filename;
    userimage.mv(filepath, function (err) {});

    Users.editprofile(
      user_id,
      first_name,
      last_name,
      email,
      mobile,
      filename,
      (err, editeddata) => {
        if (editeddata) {
          return res.send({
            success: "yes",
            message: "update thyi gyu loda",
            data: req.body,
          });
        } else {
          return res.send({
            success: "no",
            message: "something is wrong daya",
            data: [],
          });
        }
      }
    );
  });
};

exports.changepassword = (req, res) => {
  const { user_id, old_password, new_password } = req.body;
  let errors = "";
  if (!user_id) {
    errors = "email is required.";
  } else if (!old_password) {
    errors = "old password is required.";
  } else if (!new_password) {
    errors = "new password is required.";
  }

  if (errors.length > 0) {
    return res.send({
      success: "no",
      message: errors,
      data: [],
    });
  }

  Users.findidandpassexists(user_id, old_password, (err, data) => {
    if (data) {
      var user_id = data.id;
      Users.updatepassword(user_id, new_password, (err, passchange) => {
        if (passchange) {
          var obj = {};
          obj["user_id"] = passchange;
          obj["new_password"] = new_password;

          return res.send({
            success: "yes",
            message: "Password has been changed successfully.",
            data: obj,
          });
        } else {
          return res.send({
            success: "no",
            message: "something is wrong daya",
            data: [],
          });
        }
      });
    }
  });
};

exports.forgotpassword = (req, res) => {
  const { email } = req.body;
  let errors = "";
  if (!email) {
    errors = "email is required.";
  }

  if (errors.length > 0) {
    return res.send({
      success: "no",
      message: errors,
      data: [],
    });
  }
  Users.emailexist(email, (err, emaildata) => {
    if (emaildata) {
      var password = Math.floor(Math.random() * 1000000);
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "meetkhunt6989@gmail.com",
          pass: "msqxghvgngqbsmzv",
          // https://stackoverflow.com/questions/59188483/error-invalid-login-535-5-7-8-username-and-password-not-accepted  - refer to this page for getting password.
        },
      });

      var mailOptions = {
        from: "meetkhunt6989@gmail.com",
        to: email,
        subject: "Forget Password.",
        text: `Your New Password is ${password}.Remember it and change it from upatepassword section incase you want to update it.`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });

      // var newpass = shah(password);
      Users.updatepasswordbymail(email, password, (err, data) => {
        if (data) {
          return res.send({
            success: "yes",
            message: `We have sent a link to change your password in your email ${email}`,
            data: [],
          });
        }
      });
    } else {
      return res.send({
        success: "no",
        message: "Kindly enter your correct email address.",
        data: [],
      });
    }
  });
};

exports.addevent = (req, res) => {
  const {
    event_name,
    image,
    entry_fee,
    event_date,
    event_time,
    event_place,
    contact_person,
    contact_no,
    capacity,
  } = req.body;

  let errors = "";
  if (!event_name) {
    errors = " event_name is required.";
  } else if (!entry_fee) {
    errors = "entry_fee  is required.";
  } else if (!event_date) {
    errors = "event_date  is required.";
  } else if (!event_time) {
    errors = "event_time  is required.";
  } else if (!event_place) {
    errors = "event_place  is required.";
  } else if (!contact_person) {
    errors = "contact_person  is required.";
  } else if (!contact_no) {
    errors = "contact_no is required.";
  } else if (!capacity) {
    errors = "capacity is required.";
  } else if (!req.files || Object.keys(req.files).length === 0) {
    return res.send({
      error: "yes",
      message: "event image is required.",
      data: [],
    });
  }

  if (errors.length > 0) {
    return res.send({
      success: "no",
      message: errors,
      data: [],
    });
  }

  let eventimage = req.files.image;
  // console.log(shopperimage); return false
  var filename = Math.floor(Math.random() * 100000) + eventimage.name;
  // console.log(filename); return false;
  var filepath = "uploads/event_image/" + filename;
  // console.log(filepath); return false;
  eventimage.mv(filepath, function (err) {});

  const eventdata = new Event({
    event_name: event_name,
    image: filename,
    entry_fee: entry_fee,
    event_date: event_date,
    event_time:event_time,
    event_place: event_place,
    contact_person: contact_person,
    contact_no: contact_no,
    capacity: capacity,
  });

  Event.addevent(eventdata, (err, data) => {
    if (data) {
      return res.send({
        success: "yes",
        message: "Event Added Successfully.",
        data: data,
      });
    }
  });
};

exports.updateevent = (req, res) => {
  const {
    event_id,
    event_name,
    image,
    entry_fee,
    event_date,
    event_place,
    contact_person,
    contact_no,
    capacity,
  } = req.body;
  // console.log(req.files); return false
  let errors = "";
  if (!event_id) {
    errors = " event_id is required.";
  } else if (!event_name) {
    errors = "event_name  is required.";
  } else if (!entry_fee) {
    errors = "entry_fee  is required.";
  } else if (!event_date) {
    errors = "event_date  is required.";
  } else if (!event_place) {
    errors = "event_place  is required.";
  } else if (!contact_person) {
    errors = "contact_person  is required.";
  } else if (!contact_no) {
    errors = "contact_no is required.";
  } else if (!capacity) {
    errors = "capacity is required.";
  } else if (!req.files || Object.keys(req.files).length === 0) {
    return res.send({
      error: "yes",
      message: "event image is required.",
      data: [],
    });
  }

  if (errors.length > 0) {
    return res.send({
      success: "no",
      message: errors,
      data: [],
    });
  }

  let eventimage = req.files.image;
  // console.log(shopperimage); return false
  var filename = Math.floor(Math.random() * 100000) + eventimage.name;
  // console.log(filename); return false;
  var filepath = "uploads/event_image/" + filename;
  // console.log(filepath); return false;
  eventimage.mv(filepath, function (err) {});

  // console.log(filename); return false
  Event.findeventexist(event_id, event_name, (err, data) => {
    if (data) {
      var ev_id = data.id;
      Event.updateevent(
        ev_id,
        event_name,
        filename,
        entry_fee,
        event_date,
        event_place,
        contact_person,
        contact_no,
        capacity,
        (err, updateddata) => {
          if (updateddata) {
            return res.send({
              success: "no",
              message: "Event data updated successfully.",
              data: ev_id,
            });
          } else {
            return res.send({
              success: "no",
              message: "Something happened wrong.",
              data: [],
            });
          }
        }
      );
    } else {
      return res.send({
        success: "no",
        message: "Event is not exist",
        data: [],
      });
    }
  });
};

exports.checkadmin = (req, res) => {
  const { user_id } = req.body;

  let errors = "";
  if (!user_id) {
    errors = "user_id is required.";
  }

  if (errors.length > 0) {
    return res.send({
      success: "no",
      message: errors,
      data: [],
    });
  }

  Users.checkadmin(user_id, (err, data) => {
    // console.log(data.length); return false
    if (data) {
      var newobj = {};
      newobj["Name"] = data.name;
      return res.send({
        success: "yes",
        message: "You can add events.",
        data: newobj,
      });
    } else {
      return res.send({
        success: "no",
        message:
          "Sorry,You dont have access to add events.kindly contact our admins.",
        data: [],
      });
    }
  });
};
