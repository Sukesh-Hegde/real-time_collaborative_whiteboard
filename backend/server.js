const express = require("express")
const app = express();

const server = require('http').createServer(app);
const { Server } = require("socket.io");
const { addUser } = require("./utils/users");
const io = new Server(server);

//routes
app.get("/", (req,res)=>{
    res.send(
        "realtime board"
    )
});

let roomIdGlobal,imgURLGlobal

io.on("connection", (socket)=> {
 socket.on("userJoined", (data) => {
   const { name, userId, roomId, host, presenter } = data;
   roomIdGlobal = roomId;
   socket.join(roomId);
   const users = addUser({
     name,
     userId,
     roomId,
     host,
     presenter,
     socketId: socket.id,
   });
   socket.emit("userIsJoined", { success: true, users});
//    console.log({ name, userId });
   socket.broadcast.to(roomId).emit("allUsers", users);
//    setTimeout(() => {
   //   socket.broadcast
   //     .to(roomId)
   //     .emit("userJoinedMessageBroadcasted", { name, userId, users });
     socket.broadcast.to(roomId).emit("whiteBoardDataResponse", {
       imgURL: imgURLGlobal,
     });
//    }, 1000);
 });   

   socket.on("whiteboardData", (data) => {
     imgURLGlobal = data;
     socket.broadcast.to(roomIdGlobal).emit("whiteBoardDataResponse", {
       imgURL: data,
     });
   });
})

const port = process.env.PORT || 5000;
server.listen(port, ()=>console.log(`server is running on port ${port}`));
