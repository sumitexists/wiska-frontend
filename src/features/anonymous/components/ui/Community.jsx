import PostCard from "./PostCard"
import {useState} from "react"
import {useLoaderData, useNavigate} from "react-router-dom"
import formatedTime from "../../../../utils/formatedTime"
import {joinCommunity, leaveCommunity} from "../../../../services/anonymousService";

function Community() {
    const [communityData, posts] = useLoaderData()
    const [community, setCommunity] = useState(communityData)
    const navigate = useNavigate()
    console.log(community, posts)
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
    
    
        }

    return(
    <div className="border-x border-cyan-400 w-full max-w-6xl mx-auto p-4">
        <div className="p-6">
            <h2 className="text-6xl text-cyan-400 font-semibold mb-4 text-center">{community.name}</h2>
            <p className="text-2xl text-cyan-200">{community.description}</p>
            <div className="flex gap-4 my-4">
              <span className="text-md text-cyan-300 border-2 border-cyan-700 rounded-lg p-2">Members: {community.number_of_members}</span>
              <span className="text-md text-cyan-300 border-2 border-cyan-700 rounded-lg p-2">Posts: {community.number_of_posts}</span>
            </div>
            <div className="flex gap-4 my-4">
               <span className="text-md text-cyan-300 border-2 border-cyan-700 rounded-lg p-2">Created by: {community.owner_username}</span><span className="text-md text-cyan-300 border-2 border-cyan-700 rounded-lg p-2">Created at: {formatedTime(community.created_at)}</span>
            </div>
            <button onClick={handleJoinCommunity} className="bg-white self-start text-black p-2 cursor-pointer shadow-md shadow-zinc-500 font-semibold">[{community.is_member ? 'Leave Community' : 'Join Community'}]</button>
           
        </div>
        <hr/>
        <div className="h-full  w-full max-w-4xl mx-auto overflow-y-auto scrollbar-none">
        {
          posts? posts.map((post) => (
            <PostCard key={post.id} postData={post} onClickPost={()=>navigate(`/anonymous-mode/post/${post.id}`)} />
          )) : <p>No posts available.</p>
        }
        </div>
    </div>
        
    )
}
export default Community