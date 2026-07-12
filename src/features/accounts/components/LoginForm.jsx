import { useEffect, useState } from "react"
import InputField from "../../../components/ui/InputField"
import Button from "../../../components/ui/Button"
import { NavLink, Link, useNavigate } from "react-router-dom"
import useUser from "../../../context/auth/AuthContext"
import { loginService } from "../../../services/authServices"


function LoginForm() {
  const {setUser,isLoggedIn, setIsLoggedIn} = useUser();
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loginFailed, setloginFailed] = useState("")
  const navigate = useNavigate();

  const loginUser = async (e)=>{
    e.preventDefault()
    try{
      const user = await loginService(username, password);
      if(user){
        setUser(user);
        setIsLoggedIn(true);
      }
    }
    catch (err) {
      console.error("Authentication failed:", err.message);
      setloginFailed("Wrong Credentials!")
    }
  }

  useEffect(()=>{
    if (isLoggedIn) {
      navigate("/");
    }
  },[isLoggedIn, navigate])

  return (
    <form className="w-full" onSubmit={loginUser}>

    <div className="flex flex-col justify-center items-center gap-y-6 w-full max-w-lg pt-10 pb-50 px-10 m-auto backdrop-blur-md bg-cyan-100/10 border border-white/30 shadow-xl rounded-2xl text-white">
        <h2 className="self-start text-6xl tracking-tighter mb-6 text-white font-bold font-grotesk">Log In</h2>
        <NavLink to="/" className="text-4xl mr-10 bg-linear-to-r from-white to-cyan-500 bg-clip-text text-transparent font-semibold font-kranky">WISKA</NavLink>
        <p className={`${!loginFailed? "hidden" : "block"} text-sm mt-1 flex items-center gap-1 font-medium text-red-600`}>{loginFailed}</p>
        <InputField placeholder="&#x1F464; Username" type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
        <InputField placeholder="&#x1F512;Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <div className="flex w-full justify-between items-center">
          <Link to="#" className=" self-start text-blue-400 ml-6 mb-8 hover:text-blue-500 hover:underline"> Forget Password?</Link>
          <Link to="/register" className=" self-start text-blue-400 ml-6 mb-8 hover:text-blue-500 hover:underline tracking-tighter pr-6"> Don't have an account?</Link>
        </div>
        
        <Button text="login" className="w-30% text-[18px]"
        />
    </div>
    </form>
  )
}

export default LoginForm