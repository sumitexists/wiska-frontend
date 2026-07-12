import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAnonymousUser from "../../../../context/auth/AnonymousContext";
import PostCard from "./PostCard";
import CommunityCard from "./CommunityCard";
import { deletePost } from "../../../../services/anonymousService";

function Profile() {
  // State to track which view is selected
  const [activeTab, setActiveTab] = useState("posts");
  const navigate = useNavigate();

  const [postsData, communitiesData] = useLoaderData();
  const { anonymousUser } = useAnonymousUser();

  // Safe extraction of arrays from your loader data structure
  const [posts, setPosts] = useState(postsData? postsData : []);
  const [communities, setCommunities] = useState(
    communitiesData? communitiesData : [],
  );
  const handleDeletePost = async (e, postId) => {
    e.stopPropagation(); // Prevent the click from propagating to the PostCard
    try {
      await deletePost(postId);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    } catch (error) {
      throw error; // Rethrow the error to be handled by the caller
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-semibold text-center font-mono tracking-tighter my-8 animate-pulse">
        Hello, {anonymousUser?.username}
      </h1>
      <hr className="mx-14" />

      <div className="w-full max-w-6xl mx-auto">
        {/* Navigation Tabs */}
        <div className="flex justify-between items-center border-b border-zinc-600 mb-6">
          <ul className="flex gap-8 p-4  font-mono tracking-tighter text-lg font-semibold">
            <li
              className={`p-2 mb-2 cursor-pointer ${activeTab === "posts" ? "border-b-2 border-cyan-400 text-cyan-400" : ""}`}
              onClick={() => setActiveTab("posts")}
            >
              Posts
            </li>
            <li
              className={`p-2 mb-2 cursor-pointer ${activeTab === "communities" ? "border-b-2 border-cyan-400 text-cyan-400" : ""}`}
              onClick={() => setActiveTab("communities")}
            >
              Communities
            </li>
          </ul>
          <ul className="flex gap-4 p-4 mb-6 font-mono tracking-tighter text-lg font-semibold">
            <button
              className="bg-white text-black hover:bg-cyan-500 p-2 hover:text-white"
              onClick={() => {
                navigate("/anonymous-mode/create-post");
              }}
            >
              Create Posts
            </button>
            <button
              className="bg-cyan-700 hover:bg-cyan-500 hover:text-black text-white p-2"
              onClick={() => {
                navigate("/anonymous-mode/create-community");
              }}
            >
              Create Community
            </button>
          </ul>
        </div>

        {/* Dynamic Content Window */}
        <div className="h-full border-x border-cyan-400 w-full max-w-6xl mx-auto overflow-y-auto scrollbar-none">
          {activeTab === "posts" ? (
            posts.length > 0 ? (
              posts.map((post) => (
                <PostCard
                  key={post.id}
                  postData={post}
                  onClickPost={() =>
                    navigate(`/anonymous-mode/post/${post.id}`)
                  }
                  deleteButton={true}
                  onClickDelete={(e) => handleDeletePost(e, post.id)}
                />
              ))
            ) : (
              <p className="text-center p-4 text-zinc-400">
                No posts posted by you.
              </p>
            )
          ) : communities.length > 0 ? (
            communities.map((community) => (
              <CommunityCard
                key={community.id}
                communityData={community}
                onClickCommunity={() =>
                  navigate(`/anonymous-mode/community/${community.id}`)
                }
                additionInhandleJoinCommunity={() => {
                  // Update the communities state to reflect the change in membership
                  setCommunities((prevCommunities) =>
                    prevCommunities.filter(
                      (communityItem) => communityItem.id !== community.id,
                    ),
                  );
                }}
              />
            ))
          ) : (
            <p className="text-center p-4 text-zinc-400">
              You didn't join any communities yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
