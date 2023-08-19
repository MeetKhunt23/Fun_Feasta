const express=require('express');
const path=require('path');
const router=express.Router();

router.get("/profile_image/:filename",(req,res)=>{
    res.sendFile(path.join(__dirname,"../../uploads/profile_image/"+req.params.filename))
})
router.get("/event_image/:filename",(req,res)=>{
    res.sendFile(path.join(__dirname,"../../uploads/event_image/"+req.params.filename))
})

module.exports=router;