
import {Server} from "socket.io";


const io = new Server(3001,{
  cors:{
    "origin": "http://localhost:3000",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  }
});


io.on("connection",(socket)=>{
  socket.emit("hello", "world");
  console.log(socket.id)
})