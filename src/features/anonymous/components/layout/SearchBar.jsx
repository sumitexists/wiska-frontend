



function SearchBar({ searchQuery="", setSearchQuery=()=>{}, handleSearch=()=>{} }) {
  return (
    <div className="flex items-center justify-between gap-4 w-full p-4 max-w-4xl mx-auto ">
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="bg-gray-800 text-gray-300 placeholder:text-gray-500 border border-gray-600 outline-none w-full max-w-3xl px-4 py-2"
      />
      <button onClick={handleSearch} className="bg-cyan-500 hover:bg-cyan-600 text-white font-mono tracking-tighter font-semibold py-2 px-4 hover:scale-102 hover:shadow-md
      shadow-cyan-600 transition-transform duration-200">
        [Search]
      </button>
    </div>
  );
}
export default SearchBar;