import FriendBubble from "./FriendBubble";
import {removeKnownContactService} from "../../../../services/knownContactService";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";

function FriendsList( ) {
    const data = useLoaderData();
    const [friends, setFriends] = useState(data);

    const handleRemoveFriend = async (friendId) => {
        try {
            const response = await removeKnownContactService(friendId);
            setFriends((prevFriends) => prevFriends.filter((friend) => friend.id !== friendId));
        } catch (error) {
            console.error("Error removing friend:", error);
        }
    };


    return (
        <div className="h-full overflow-y-auto p-4">
      {friends && friends.length > 0 ? friends.map((friend) => (
        <FriendBubble key={friend.id} friend={friend.contact_details.username} name={`${friend.contact_details.first_name} ${friend.contact_details.last_name}`} btnText="[Remove Friend]" handleOnClick={() => handleRemoveFriend(friend.id)} />
      )): <p className="h-full w-full text-center text-zinc-400">No friends to display.</p>}
    </div>
    )

}
export default FriendsList;