const sql = require("./db.js");

const Comment = function (comment) {
  this.user_id = comment.user_id;
  this.event_id = comment.event_id;
  this.comment = comment.comment;
};

Comment.postcomment = (obj, result) => {
  sql.query(`INSERT INTO comments SET ?`, [obj], (err, res) => {
    // console.log(res); return false
    result(null,res.insertId);
    return;
  });
};


Comment.getallcommentsbyid=(event_id,result)=>{
    sql.query(`SELECT C.*,u.first_name,u.last_name FROM comments as c LEFT JOIN users as u ON u.id=c.user_id WHERE event_id=${event_id}`,(err,res)=>{
        // console.log(res); return false;
        result(null,res)
        return;
    })
}

module.exports = Comment;
