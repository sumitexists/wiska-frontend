
function ReceiverBlock({receiverUsername}) {


    return (
        <div className="w-full flex h-2/30 border-b py-2 px-4 bg-zinc-800 border-slate-700" >
            <h3 className="w-full text-xl font-semibold text-white self-center">{receiverUsername}</h3>
        </div>
    )
}

export default ReceiverBlock;