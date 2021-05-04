
import {Server, Socket} from "socket.io";


const io = new Server(3001,{
  path: "/",
  serveClient: false,
  // below are engine.IO options
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: false,
  cors:{
    "origin": "localhost:3000",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  }
});


io.on("connection",(data)=>{
  console.log(data)
})