import React from 'react'
import ReactQuill from 'react-quill';

interface TextEditorProps {

}
//sdfsdfsdfsdfsfs
export const TextEditor: React.FC<TextEditorProps> = ({}) => {
    return (<>
      <ReactQuill theme="snow" className="container" />
      
      </>
    );
}