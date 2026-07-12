import {joinCommunity, leaveCommunity} from "../../../../services/anonymousService";
import {useState} from "react";

function CommunityCard({ communityData , onClickCommunity=()=>{}, additionInhandleJoinCommunity=()=>{} }) {
    const [community, setCommunity] = useState(communityData);
    const handleJoinCommunity = async (e) => {
        e.stopPropagation();
        if (community.is_member) {
            const response = await leaveCommunity({ followingId: community.following_id });
                setCommunity((prevCommunity) => ({ ...prevCommunity, is_member: false, number_of_members: prevCommunity.number_of_members - 1, following_id: null }));
        }
        else{
            const response = await joinCommunity({ communityId: community.id });
            if (response) {
                setCommunity((prevCommunity) => ({ ...prevCommunity, is_member: true, number_of_members: prevCommunity.number_of_members + 1 , following_id: response.id }));
            }
        }
        additionInhandleJoinCommunity();


    }

    return(
        <div className="flex flex-col justify-between w-full max-w-4xl mx-auto min-h-[260px] rounded-lg shadow-md p-4 my-10 shadow-slate-800 transition-transform duration-400 hover:scale-105 border-cyan-300 border cursor-pointer text-cyan-400 bg-slate-800 delay-100 hover:shadow-[5px_5px_15px] hover:shadow-cyan-800 px-8" onClick={onClickCommunity}>
            <h3 className="text-4xl font-bold my-6 capitalize">{community.name}</h3>
            <p className="text-gray-600 mb-8">{community.description}</p>
            <p className="mb-4"><span>Followed By : {community.number_of_members}</span><span className="ml-6">Posts : {community.number_of_posts}</span></p>
            <button onClick={handleJoinCommunity} className="bg-white self-start text-black p-2 cursor-pointer shadow-md shadow-zinc-500 font-semibold">[{community.is_member ? 'Leave Community' : 'Join Community'}]</button>
        </div>
    )
}
export default CommunityCard