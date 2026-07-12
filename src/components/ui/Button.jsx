

function Button({text="Submit" , type="submit", className="", onClick}) {
  return (
    <div className="w-full flex justify-center">
        <button type={type} className={`bg-blue-500 rounded-lg outline-none px-5 py-1 hover:bg-blue-400 transition-colors duration-400 cursor-pointer hover:shadow-[2px_3px_10px] hover:shadow-gray-600 capitalize ${className}`} onClick={onClick}>{text}</button>
    </div>
  )
}

export default Button