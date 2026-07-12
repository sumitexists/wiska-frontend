import { useLoaderData } from "react-router-dom";
import FriendBubble from "./FriendBubble";
import {updateFriendStatusService} from "../../../../services/knownContactService";
import { useState } from "react";

function PendingFriendRequest() {
  const data = useLoaderData();
  const [pendingRequests, setPendingRequests] = useState(data);

  const handleAcceptRequest = async (friendId) => {
    try {
      const response = await updateFriendStatusService(friendId, "ACCEPTED");
      setPendingRequests((prevRequests) => prevRequests.filter((request) => request.id !== friendId));
    } catch (error) {
      console.error("Error accepting friend request:", error);
      throw error;
    }
  };

  return (
    <div className="h-full overflow-y-auto p-4">
      {pendingRequests && pendingRequests.length > 0 ? pendingRequests.map((pendingRequest) => (
        <FriendBubble key={pendingRequest.id} friend={pendingRequest.contact_details.username} name={`${pendingRequest.contact_details.first_name} ${pendingRequest.contact_details.last_name}`} btnText="[Accept Request]" handleOnClick={() => handleAcceptRequest(pendingRequest.id)} />
      )): <p className="h-full w-full text-center text-zinc-400">No pending friend requests.</p>}
    </div>
  );
}

export default PendingFriendRequest;
