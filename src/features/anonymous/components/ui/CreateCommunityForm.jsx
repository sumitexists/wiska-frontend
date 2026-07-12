import { useState, useRef } from "react";
import { createCommunity } from "../../../../services/anonymousService";

function CreateCommunityForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const errorRef = useRef(null);
  const handleCreateCommunity = async (e) => {
    e.preventDefault();
    try{
      if(!name || !description){
        return;
      }
      const response = await createCommunity({ name, description });
      if(response.status === 201){
        setName("");
        setDescription("");
      }
      else if (response.status === 400){
        if(errorRef.current){
          errorRef.current.classList.remove("hidden");
          errorRef.current.style.display = "block";
        } 
      }
      
    }
    catch(error){
      throw error;
    }}

  return (
    <div className="w-full max-w-6xl mx-auto border-2 border-cyan-300 rounded-lg p-4">
      <h1 className="text-4xl font-semibold font-mono tracking-tighter mb-4 text-white">
        Create Community
      </h1>
      <form onSubmit = {handleCreateCommunity}>
        <div>
          <label className="block text-lg font-semibold mb-2 text-white">
            Name:
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300"
            value={name}
            onChange={(e) => {
              if(e.target.value.length > 30) return;
              setName(e.target.value);
              if(errorRef.current){
                errorRef.current.classList.add("hidden");
                errorRef.current.style.display = "none";
              }
            }}
          />
          <p className="text-zinc-400 text-sm">{`${30 - name.length}/30`}</p>
          <p className="text-red-500 text-sm hidden" ref={errorRef}>
            Community with this name already exists.
          </p>
        </div>
        <div>
          <label className="block text-lg font-semibold mb-2 text-white">
            Description:
          </label>
          <textarea
            type="text"
            className="w-full p-2 border border-gray-300"
            value={description}
            onChange={(e) => {
              if(e.target.value.length > 200) return;
              setDescription(e.target.value);
            }}
          />
          <p className="text-zinc-400 text-sm">{`${200 - description.length}/200`}</p>
        </div>
        <button
          type="submit"
          className="mt-4 bg-cyan-700 hover:bg-cyan-500 text-white p-2 rounded-lg"
        >
          Create Community
        </button>
      </form>
    </div>
  );
}
export default CreateCommunityForm;
