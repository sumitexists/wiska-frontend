import Button from "./Button"
import { NavLink } from "react-router-dom"

function Cards({heading="",content="", className="", btnText="", pClassName="", hClassName="", btnClassName="", url=""}) {
  return (
    <div className={`${className} bg-neutral-900/40 transition-transform duration-400 delay-100 hover:scale-x-102 hover:scale-y-105 shadow-md shadow-zinc-700 hover:shadow-xl backdrop-blur-md h-full min-h-120 w-full max-w-7/10 rounded-sm mx-auto`}>
        <h1 className={` ${hClassName} text-center text-4xl font-bold pt-8`}>{heading}</h1>
        <p className={`${pClassName} text-zinc-500`}>{content}</p>
        <NavLink to={url}><Button text={btnText} type="button" className={btnClassName}/></NavLink>
    </div>
  )
}

export default Cards