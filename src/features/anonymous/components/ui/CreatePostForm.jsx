import {
  listCommunities,
  createPost,
} from "../../../../services/anonymousService";
import useAnonymousUser from "../../../../context/auth/AnonymousContext";
import { useState, useEffect } from "react";
function CreatePostForm() {
  const { anonymousUser } = useAnonymousUser();
  const [communityName, setCommunityName] = useState([]);
  const [communityList, setCommunityList] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [community, setCommunity] = useState("");
  const fetchCommunityName = async (id) => {
    try {
      const response = await listCommunities(id);
      if(response.length === 0) {
        setCommunityList([]);
        return [];
      }
      const communityList = response.map((community) => {
        return { id: community.id, name: community.name };
      });
      return communityList;
    } catch (error) {
      throw error;
    }
  };
  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const communityList = await fetchCommunityName(anonymousUser?.id);
        setCommunityList(communityList);
      } catch (error) {
        console.error("Error fetching communities:", error);
      }
    };

    if (anonymousUser?.id) {
      fetchCommunities();
    }
  }, [anonymousUser?.id]);

  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      if (!title || !content) {
        return;
      }
      console.log("Creating post with title:", title, "content:", content, "community:", community);
      const respone = await createPost({ title, content, community });
      setTitle("");
      setContent("");
      setCommunity("");
    } catch(error) {
      console.error("Error creating post:", error);
      throw error;
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto border-2 border-cyan-300 rounded-lg p-4">
      <h1 className="text-4xl font-semibold font-mono tracking-tighter mb-4 text-white">
        Create Post
      </h1>
      <form
        className="flex flex-col gap-6"
        onSubmit={handleCreatePost}
      >
        <div className="flex gap-6 items-center">
          <label className=" text-lg font-semibold mb-2 text-white">
            Title:
          </label>
          <input
            type="text"
            className=" p-2 bg-zinc-800 w-1/5 outline-none"
            value={title}
            placeholder="Enter title"
            onChange={(e) => {
              if (e.target.value.length > 100) {
                e.preventDefault();
                return;
              }
              setTitle(e.target.value)
            }}
          />
          <p className="text-zinc-400 text-sm">{`${100 - title.length}/100`}</p>
        </div>
        <div className="flex gap-6 items-center">
          <label className=" text-lg font-semibold mb-2 text-white">
            Content :
          </label>
          <textarea
            type="text"
            className=" p-2 scrollbar-none bg-zinc-800 w-3/5 outline-none"
            value={content}
            onChange={(e) => {
              if (e.target.value.length > 500) {
                e.preventDefault();
                return;
              }
              setContent(e.target.value);
            }}
          />
          <p className="text-zinc-400 text-sm">{`${500 - content.length}/500`}</p>
        </div>
        <div className="flex gap-6 items-center ">
          <label className=" text-lg font-semibold mb-2 text-white">
            Community :
          </label>
          <select className="bg-zinc-800 w-1/5 p-2 ">
            <option value="">
              ---
            </option>
            {communityList.map((community) => (
              <option key={community.id} value={community.id}>
                {community.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="mt-4 mr-auto self-start bg-cyan-700 hover:bg-cyan-500 text-white p-2 rounded-lg"
          
        >
          Create Post
        </button>
      </form>
    </div>
  );
}
export default CreatePostForm;
