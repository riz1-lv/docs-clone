
import React, { useEffect, useRef, useState } from 'react';
import {  default as ReactQuill, Quill } from 'react-quill';
import { io, Socket } from "socket.io-client";
import {useParams} from 'react-router-dom'

// interface TextEditorProps { }
interface DocRouteParams{
  id: string;
}
const modules = {
  toolbar: [
    [{ 'header': [1,2,3,4,5,6, false] }],
    [{font:[]}],
    ['bold', 'italic', 'underline','strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image', "blockquote", "code-block"],
    [{color:[]}, {background:[]}],
    [{script:"sub"},{script:"super"}],
    [{align: []}],
    ['clean']
  ],
}

export const TextEditor = () => {
  const { id: documentId } = useParams<DocRouteParams>();
  const [socket , setSocket] = useState<Socket>();
  const [quill, setQuill] = useState<Quill>();

  let quillRef = useRef() as React.MutableRefObject<Quill>
  const quills = useRef() as React.MutableRefObject<ReactQuill>
  
  useEffect(()=>{
    const sckt = io("http://localhost:3001",{reconnectionAttempts:12});
    setSocket(sckt)
    return()=>{
      sckt.disconnect();
    }
  },[])

  useEffect(()=>{
    quillRef.current = quills.current.getEditor();
    console.log(quillRef.current)
    if(quillRef.current){
      quillRef.current.disable()
      quillRef.current.setText("Loading...")
    }
    setQuill(quillRef.current)
   
  },[])


  useEffect(() => {
    if(socket == null || quill == null) return;
    socket.once('load-document', document =>{
      quill.setContents(document)
      quill.enable()
    })
    socket.emit('get-document', documentId)
  }, [quill,socket, documentId])


  useEffect(() => {
  if(socket == null || quill == null) return;

    
    quill.on('text-change', function handler(delta, oldDelta, source){
      if (source !== 'user') {
        return;
      }
      socket.emit("changes",delta)
    });
    //return() =>{quillRef.current.off("text-change", handler )}
  },[quill, socket])

  useEffect(() => {
    if(socket == null || quill == null) return;

    socket.on('recieve-changes', (delta)=>{
      quill.updateContents(delta);
    });
    //return() =>{quillRef.current.off("text-change", handler )}
  },[quill, socket])


    return (
      <>
        <ReactQuill ref={quills} theme="snow" className="container" modules={modules}/>
      </>
    );
}
