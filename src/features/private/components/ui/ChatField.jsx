import SendIcon from "./SendIcon";
import{useRef} from "react";
function ChatField({onSendMessage = () => {}, message="", setMessage = () => {}}) {
    const textareaRef = useRef(null);

    const handleInput = (e) => {
        setMessage(e.target.value);

        const textarea = textareaRef.current;
        if (textarea) {

        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
        }
    };
  return (
    <form onSubmit ={(e) => {
        e.preventDefault();
        onSendMessage();
    }} className="self-end flex justify-between w-full max-w-screen-4xl bg-zinc-700">
      <textarea
      ref={textareaRef}
      value={message}
      onChange={handleInput}
      placeholder="Type a message..."
      rows={1}
      className=" focus:outline-none
        w-full p-4 bg-zinc-700
        resize-none
        max-h-50 
        overflow-y-auto
        scrollbar-none
        text-stone-300
        placeholder:text-zinc-500
      "
    />
      <button
        className="p-3 w-12 h-12 flex justify-center items-center m-2  rounded-full self-starttransition-colors bg-blue-700"
        aria-label="Send Message"
      >
        <SendIcon className="w-7 h-7 rounded-full text-white hover:scale-110 transition-colors" />
      </button>
    </form>
  );
}
export default ChatField;
