const express=require('express');
const body_parser=require('body-parser');
const file=require("./app/routes/file.js");
const cors = require("cors")
const App=express();
global.nodeSiteUrl = 'http://localhost:1010'

App.use(cors())
// App.use(body_parser. text({type: '/'}));
App.use(body_parser.json());    
App.use(body_parser.urlencoded({extended:true}));

App.get('/',(req,res)=>{
    res.send({message:"Heyy there i am making event management Api's."})
})

require("./app/routes/users.js")(App);
require("./app/routes/event.js")(App);
require("./app/routes/address.js")(App);
require("./app/routes/tickets.js")(App);
require("./app/routes/liked_events.js")(App);
require("./app/routes/comment.js")(App);


App.use("/file",file);
const port=process.env.port ||1010;
App.listen(port,()=>{
    console.log(`you are running on ${port}.`)
})
