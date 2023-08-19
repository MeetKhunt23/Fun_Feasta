const Comment = require("../model/comment.js");

exports.post_comment = (req, res) => {
  const { user_id, event_id, comment } = req.body;

  let errors = "";
  if (!user_id) {
    errors = " user_id is required.";
  } else if (!event_id) {
    errors = " event_id is required.";
  } else if (!comment) {
    errors = " comment is required.";
  }

  if (errors.length > 0) {
    return res.send({
      success: "no",
      message: errors,
      data: [],
    });
  }

 const obj=new Comment({
    event_id:event_id,
    user_id:user_id,
    comment:comment
 })

//  console.log(obj ); return false

  Comment.postcomment(obj,(err,data)=>{
    if(data){
        return res.send({
            success: "yes",
            message: "Comment added sucessfully.",
            data: data,
          }); 
    }
  })
};

exports.getcommentsbyevent=(req,res)=>{
  const{event_id}=req.body;
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

  Comment.getallcommentsbyid(event_id,(err,data)=>{
    if(data){
      return res.send({
        success: "yes",
        message: "here are list of all comments",
        data: data,
      });
    }

    else{
      return res.send({
        success: "no",
        message: "Something happened wrong.",
        data: [],
      });
    }
  })
}
