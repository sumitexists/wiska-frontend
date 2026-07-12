
import {addKnownContactService} from "../../../../services/knownContactService";
import {useState} from "react";

function FriendBubble({friend, name="", btnText="[Add Friend]",handleOnClick =()=>{}}) {
    const [status, setStatus] = useState("[Add Friend]");

    

    return(
        <div className="flex justify-between items-center border border-zinc-600 p-4 mb-6 w-full max-w-4xl mx-auto ">
            <div className="flex flex-col">
                <h1 className="font-semibold text-2xl">{friend}</h1>
                {name? <p className="text-zinc-400">{name}</p> : null}
            </div>
            <div>
                <button className="bg-white text-black px-4 py-2 font-mono tracking-tighter transition-transform duration-300 hover:scale-103 hover:shadow-[3px_3px_7px] shadow-zinc-600" onClick={handleOnClick }>
                    {btnText}
                </button>
            </div>
            
        </div>
    )
}
export default FriendBubble;