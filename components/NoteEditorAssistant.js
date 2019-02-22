const NoteEditorAssistant = () => (
  <>
    <NoteEditorCommandButton cmd="italic" />
    <NoteEditorCommandButton cmd="bold" />
    <style global jsx>{`
      .pop {
        background-image: linear-gradient(to bottom,rgba(49,49,47,.99),#262625);
        background-repeat: repeat-x;
        border-radius: 5px;
        padding: 0 10px;
        color: white;
        line-height: 44px;
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
  </>
)

const NoteEditorCommandButton = ({ cmd, arg, name }) => {
  return (
    <button
      className="text-white"
      key={cmd}
      onMouseDown={evt => {
        evt.preventDefault(); // Avoids loosing focus from the editable area
        document.execCommand(cmd, false, arg); // Send the command to the browser
      }}
    >
      {name || cmd}
    </button>
  );
}

export default NoteEditorAssistant;

{/* <CmdButton cmd="strikeThrough" />
<CmdButton cmd="underline" />
<CmdButton cmd="insertImage" />
<CmdButton cmd="foreColor" />
<CmdButton cmd="hiliteColor" />
<CmdButton cmd="createLink" arg="http://google.in"/>
<CmdButton cmd="insertOrderedList" name="ol" />
<CmdButton cmd="insertUnorderedList" name="ul" />
<CmdButton cmd="formatBlock" arg="h1" name="h1" /> */}