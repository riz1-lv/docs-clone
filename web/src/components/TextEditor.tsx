import React from 'react'
import ReactQuill from 'react-quill';

interface TextEditorProps {

}
const modules = {
  toolbar: [
    [{ 'header': [1, 2,3,4,5,6,7, false] }],
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
//sdfsdfsdfsdfsfs
export const TextEditor: React.FC<TextEditorProps> = () => {
    return (<>
      <ReactQuill theme="snow" className="container" modules={modules}/>
      
      </>
    );
}