
require('dotenv').config()
import {Server} from "socket.io";
import mongoose from 'mongoose';
import Document from './Schema/Document.js'



 mongoose.connect(process.env.MONGODB_URI ||'mongodb://localhost/docs', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

const defaultValue = "";

const io = new Server(3001,{
  cors:{
    "origin": "http://localhost:3000",
  "methods": ["GET","POST"]
  },
  }
);


io.on("connection",(socket)=>{
  console.log("connected")


socket.on("get-document", async documentId => {
  const document = await findOrCreateDocument(documentId);
  socket.join(documentId);
  socket.emit('load-document', document.data);

  socket.on("changes",(delta)=>{
    socket.broadcast.to(documentId).emit("recieve-changes",delta)
    console.log(delta)
  })
  socket.on("save-document", async data =>{
    await Document.findByIdAndUpdate(documentId, {data})
  })
 })
})

async function findOrCreateDocument(id:String){
  if(id == null) return

  const document = await Document.findById(id)
  if (document)  return document
  return await Document.create({_id:id, data: defaultValue })
}