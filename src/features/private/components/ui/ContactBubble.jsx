

function ContactBubble({username, fetchMessages}) {
    return (
        <div onClick={fetchMessages} className=" w-full border-b border-zinc-600 py-2 px-4 ">
            <p className="text-xl text-white font-semibold tracking-tighter py-4 pl-4">{username}</p>
        </div>
    )
} 

export default ContactBubble