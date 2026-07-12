

function ChatBubble({isSender=true, sender="", content="", time=""}) {
  return (
    <div className={`${isSender? "ml-auto" : "mr-auto"} flex flex-col min-w-60 max-w-120 border py-2 px-4 rounded-xl shadow-md m-10 shadow-slate-400 ${isSender? "bg-stone-600 border-zinc-900" : "bg-zinc-800 border-slate-700"}`} >
        <p className='pb-2 mb-2 border-b border-slate-500 font-semibold'>{sender}</p>
        <p>{content}
        </p>
        <p className='self-end'>{time}</p>
    </div>
  )
}
export default ChatBubble