import {useState, useRef} from "react";
import FriendBubble from "./FriendBubble";
import {searchFriendService, addKnownContactService} from "../../../../services/knownContactService"

function AddFriend() {
    const [friend, setFriend] = useState("");
    const [friendList, setFriendList] = useState([]);
    const [btnText, setBtnText] = useState("[Add Friend]");
    const handleAddFriend = async (friendId) => {
        try {
            const response = await addKnownContactService(friendId);
            setFriendList((prevList) =>( prevList.filter((friend) => friend.id !== friendId)));
            console.log("Friend added successfully:", response.data);
        } catch (error) {
            console.error("Error adding friend:", error);
        }
    }

    const handleSearchFriend = async () => {
        if (!friend.trim()) {
            setFriendList([]);
            return;
        }
        try {
            const response = await searchFriendService(friend);
            setFriendList(response);
        } catch (error) {
            console.error("Error searching friends:", error);
        }
    };

    return(
        <div className="pb-12">
            <form className="flex justify-between items-center px-4 py-4 border border-zinc-600 mb-6 w-full gap-8" onSubmit={(e) => e.preventDefault()}>
                <input 
                    type="text" 
                    placeholder="Enter friend's username or email" 
                    value={friend}
                    onChange={(e) => setFriend(e.target.value)}
                    className="w-full outline-none"
                    autoFocus
                />
                <button className="bg-white text-black px-4 py-2 font-mono tracking-tighter transition-transform duration-300 hover:scale-103 hover:shadow-[3px_3px_7px] shadow-zinc-600 font-semibold" type="submit" onClick={handleSearchFriend}>
                    [Search]
                </button>
            </form>
            {friendList  && friendList.length > 0 ? friendList.map((friend) => (
                <FriendBubble key={friend.id} friend={friend.username} name={friend.first_name + " " + friend.last_name} btnText={btnText} handleOnClick={() => handleAddFriend(friend.id)} />
            )) : <p className="h-full w-full text-center text-zinc-400">No friends found.</p> }
        </div>
    )
}
export default AddFriend;