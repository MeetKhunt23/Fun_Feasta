const { relativeTimeRounding } = require("moment");
const sql = require("./db.js");

const Likes = function (like) {
  this.user_id = like.user_id;
  this.event_id = like.event_id;
};

Likes.checklikedornot = (user_id, event_id, result) => {
  sql.query(
    `SELECT * FROM liked_events WHERE user_id=${user_id} AND event_id=${event_id}`,
    (err, res) => {
      result(null, res[0]);
      return;
    }
  );
};

Likes.DeleteLike = (user_id, event_id, result) => {
  sql.query(
    `DELETE FROM liked_events WHERE user_id=${user_id} AND event_id=${event_id}`,
    (err, res) => {
      result(null, event_id);
      return;
    }
  );
};

Likes.likeevent = (Likedobj, result) => {
  sql.query(`INSERT INTO liked_events SET ?`, [Likedobj], (err, res) => {
    // console.log(err); return false
    result(null, res.insertId);
    return;
  });
};

Likes.getlikescountbyid = (event_id, result) => {
  sql.query(
    `SELECT COUNT(id) as likes FROM liked_events WHERE event_id=${event_id}`,
    (err, res) => {
      result(null, res[0]);
      return;
    }
  );
};

Likes.geteventids=(user_id,result)=>{
    sql.query(`SELECT event_id FROM liked_events WHERE user_id=${user_id}`,(err,res)=>{
        result(null,res)
        return;
    })
}

Likes.getmylikedevents = (user_id,result) => {
  sql.query(
    `SELECT l.*,e.*,if(e.image !='',CONCAT('` +
      nodeSiteUrl +
      `','/file/event_image/',e.image),'') AS image FROM liked_events as l LEFT JOIN events as e ON e.id=l.event_id  WHERE l.user_id=${user_id}`,
    (err, res) => {
        // console.log(res); return false
    result(null,res)
    return;
    //   data.forEach((pro) => {
    //     sql.query(
    //       `SELECT SUM(t.quantity) as booked_quantity FROM tickets as t WHERE event_id=${pro.event_id} AND status=1`,
    //       (err, bqtdata) => {
    //         var bookedqty = bqtdata[0];
    //         var obj = {};
    //         var remaining_quantity =
    //           Number(pro.capacity) -
    //           Number(bookedqty.booked_quantity ? bookedqty.booked_quantity : 0);
    //         obj["id"] = pro.id;
    //         obj["user_id"] = pro.user_id;
    //         obj["event_id"] = pro.event_id;
    //         obj["create_date"] = pro.create_date;
    //         obj["event_name"] = pro.event_name;
    //         obj["image"] = pro.image;
    //         obj["entry_fee"] = pro.entry_fee;
    //         obj["event_date"] = pro.event_date;
    //         obj["event_time"] = pro.event_time;
    //         obj["event_place"] = pro.event_place;
    //         obj["contact_person"] = pro.contact_person;
    //         obj["contact_no"] = pro.contact_no;
    //         obj["capacity"] = pro.capacity;
    //         obj["remaining_quantity"] = remaining_quantity;
    //         array.push(obj);
    //         // console.log(array);
    //         // return false;
    //         // var arr = array.map(function ({ id, user_id }) {
    //         //   return { id, user_id };
    //         // });
    //         // array.push(arr);
    //         result(null, array);
    //         return;
    //       }
    //     );
    //   });
      //   console.log(array);
      //   return false;
    }
  );
};

Likes.getcapacitybyevent = (event_id, result) => {
  sql.query(
    `SELECT capacity FROM events WHERE event_id=${event_id}`,
    (err, res) => {
      result(null, res[0]);
      return;
    }
  );
};

module.exports = Likes;
