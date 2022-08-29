const express=require('express')
const expressLayout=require('express-ejs-layouts')
const cookies=require('cookie-parser')
const app=express()
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);



//Bodyparser
app.use(express.urlencoded ({extended:false}));


// midlewere
app.use('/public', express.static('public'))



//EJS
app.use(expressLayout)
app.set('view engine', 'ejs' );
app.set("views","./views")
app.set("public","./public")



// Cookies
app.use(cookies())

// Declare the folder to express app
app.use(express.static('public'))

//Routing
app.use("/room",require("./routes/room"))
app.use("/",require("./routes/index"))



io.on('connection', (socket) => {
    //console.log('new user');
    socket.on('chat message', (msg,global_id) => {
        io.emit('chat message', msg,global_id);
      });
    socket.on('chat message', (msg) => {
     //   console.log('message: ' + msg);
      });
      socket.on("join-room",(global_id,room_id)=>{
        io.emit("join-room",global_id,room_id)
        
      })
      socket.on('disconnect', () => {
        console.log("user disconnect")
    });
      socket.on("typing",(open,room_id)=>{
         socket.broadcast.emit("typing",open,room_id)
      })
      socket.on("like",(room_id)=>{
        socket.broadcast.emit("like",room_id)
      })
  });

  server.listen(3000, () => {
    console.log('listening on *:3000');
  });