import React, { RefObject, useRef, useEffect } from 'react'
import ReactQuill, { Quill} from 'react-quill';
import { io } from "socket.io-client";

// interface TextEditorProps {

// }
const socket = io("http://localhost:3001");



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
  let q = useRef() as React.MutableRefObject<Quill>
  const quill = useRef() as React.MutableRefObject<ReactQuill>
  useEffect(() => {
    let quillRef = quill.current.getEditor();
    console.log(quillRef)
    q.current = quill.current.getEditor();
    if(q.current){
      q.current.setText("hi")
    }
  },[] )
    console.log(q)
    
    return (<>
      <ReactQuill ref={quill} theme="snow" className="container" modules={modules}/>
      
      </>
    );
}