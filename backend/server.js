const express = require("express")
const app = express();

const server = require('http').createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

//routes
app.get("/", (req,res)=>{
    res.send(
        "realtime board"
    )
});

io.on("connection", (socket)=> {
 socket.on("userJoined", (data) => {
   const { name, userId, roomId, host, presenter } = data;
//    roomIdGlobal = roomId;
   socket.join(roomId);
//    const users = addUser({
//      name,
//      userId,
//      roomId,
//      host,
//      presenter,
//      socketId: socket.id,
//    });
   socket.emit("userIsJoined", { success: true });
//    console.log({ name, userId });
//    socket.broadcast.to(roomId).emit("allUsers", users);
//    setTimeout(() => {
//      socket.broadcast
//        .to(roomId)
//        .emit("userJoinedMessageBroadcasted", { name, userId, users });
//      socket.broadcast.to(roomId).emit("whiteBoardDataResponse", {
//        imgURL: imgURLGlobal,
//      });
//    }, 1000);
 });   
})

const port = process.env.PORT || 5000;
server.listen(port, ()=>console.log(`server is running on port ${port}`));
