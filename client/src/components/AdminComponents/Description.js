import { convertFromRaw, EditorState, ContentState, convertFromHTML } from 'draft-js';
import { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';

function Description() {

  // const content = {"entityMap":{},"blocks":[{"key":"637gr","text":"Initialized from content state.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]};
  // const contentState = convertFromRaw(content);
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty())
  console.log(editorState._immutable.currentContent);
  return (
    <>
      <Editor
        editorState={editorState}
        onEditorStateChange={setEditorState}
      />
    </>
  );
}

export default Description;