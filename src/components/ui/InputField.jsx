


function InputField({placeholder = "", type ="text", label="", value="", onChange , className=""}) {


  return (
    <div className="w-full flex justify-center ">
        <label className="text-white tracking-normal capitalize">{label}</label>
        <input type={type} placeholder={placeholder} value={value} onChange={onChange} className={` px-3 py-1 rounded-lg outline-none shadow-inner shadow-blue-900/60 bg-slate-400 w-full max-w-sm ${className}` }/>
    </div>
  )
}

export default InputField