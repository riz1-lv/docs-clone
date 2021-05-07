
import { TextChangeHandler } from 'quill';
import React, { useEffect, useRef } from 'react';
import {  default as ReactQuill, Quill } from 'react-quill';
import { io } from "socket.io-client";

// interface TextEditorProps {

// }
const socket = io("http://localhost:3001",{reconnectionAttempts:12});



socket.on("connect", () => {
  console.log(socket.connected); // true
});
socket.on("hello", (arg) => {
  console.log(arg); // world
});


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
  let quillRef = useRef() as React.MutableRefObject<Quill>
  const quill = useRef() as React.MutableRefObject<ReactQuill>


  useEffect(() => {
    console.log(quillRef)
    quillRef.current = quill.current.getEditor();

    function handler<TextChangeHandler>(arg:TextChangeHandler) {
      if (source !== 'user') {
        return;
      }
      socket.emit("changes",arg.delta)
      
    }
    quillRef.current.on('text-change', handler );
    return() =>{quillRef.current.off("text-change", handler )}
    
  },[])
    console.log(quillRef)
    
    return (<>
      <ReactQuill ref={quill} theme="snow" className="container" modules={modules}/>
      
      </>
    );
}