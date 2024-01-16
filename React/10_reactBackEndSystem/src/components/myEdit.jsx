// npm install -S react-draft-wysiwyg
// npm install --save draftjs-to-html

import { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import { convertToRaw } from 'draft-js';

const Edit = ({ getContent }) => {
  const [editorState, setEditorState] = useState('')
  return (
    <div>
      <Editor
        editorState={editorState}
        onEditorStateChange={(editorState) => {
          setEditorState(editorState)
        }}
        onBlur={() => {
          getContent(draftToHtml(convertToRaw(editorState.getCurrentContent()))) // 鼠标离焦后控制台输出HTML
        }}
      />
    </div>
  )
}
export default Edit;