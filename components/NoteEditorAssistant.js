import Bold from 'react-feather/dist/icons/bold';
import Italic from 'react-feather/dist/icons/italic';
import Underline from 'react-feather/dist/icons/underline';
import ZapOff from 'react-feather/dist/icons/zap-off';
import List from 'react-feather/dist/icons/list';

const NoteEditorAssistant = () => (
  <div className="flex flex-row">
    <NoteEditorCommandButton cmd="bold">
      <Bold />
    </NoteEditorCommandButton>
    &nbsp;
    <NoteEditorCommandButton cmd="italic">
      <Italic />
    </NoteEditorCommandButton>
    &nbsp;
    <NoteEditorCommandButton cmd="underline">
      <Underline/>
    </NoteEditorCommandButton>
    &nbsp;
    <NoteEditorCommandButton cmd="strikeThrough">
      <ZapOff/>
    </NoteEditorCommandButton>
    &nbsp;&nbsp;&nbsp;
    <NoteEditorCommandButton cmd="insertUnorderedList">
      <List/>
    </NoteEditorCommandButton>
    <style global jsx>{`
      .pop {
        background-image: linear-gradient(to bottom,rgba(49,49,47,.99),#262625);
        background-repeat: repeat-x;
        border-radius: 5px;
        padding: 4px 10px;
        color: white;
        display: inline-block;
      }
      .x-arrow {
        position: absolute;
        width: 14px;
        height: 14px;
        background-color: #262625;
        transform: rotate(45deg);
        z-index: -1;
      }
      [data-placement="top"] .x-arrow {
        margin-bottom: -7px;
        bottom: 0;
      }
      [data-placement="bottom"] .x-arrow {
        margin-top: -7px;
        top: 0;
      }
    `}
    </style>
  </div>
)

const NoteEditorCommandButton = ({ cmd, arg, children }) => {
  return (
    <div
      className="flex-1 stroke-current"
      key={cmd}
      onMouseDown={evt => {
        evt.preventDefault(); // Avoids loosing focus from the editable area
        document.execCommand(cmd, false, arg); // Send the command to the browser
      }}
    >
      { children }
    </div>
  );
}

export default NoteEditorAssistant;

// @TODO: future: extended command list
{/* <CmdButton cmd="insertImage" />
<CmdButton cmd="foreColor" />
<CmdButton cmd="hiliteColor" />
<CmdButton cmd="createLink" arg="http://google.in"/>
<CmdButton cmd="insertOrderedList" name="ol" />
<CmdButton cmd="formatBlock" arg="h1" name="h1" /> */}