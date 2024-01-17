// npm install -S react-draft-wysiwyg
// npm install --save draftjs-to-html
// npm install --save draft-js
// npm i html-to-draftjs

import { useEffect, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import { EditorState, convertToRaw, ContentState } from 'draft-js'; // EditorState, ContentState
import htmlToDraft from 'html-to-draftjs'; // HTML转换回去

const Edit = ({ getContent, content }) => {
  const [editorState, setEditorState] = useState('')
  useEffect(() => { // html-to-draftjs
    // const html = '<p>Hey this <strong>editor</strong> rocks 😀</p>';
    const html = content;
    if (html === undefined) return; // debug if content not show
    const contentBlock = htmlToDraft(html);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      setEditorState(EditorState.createWithContent(contentState));
    }
  }, [content])
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