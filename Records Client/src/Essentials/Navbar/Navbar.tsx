
import {  useNavigate } from "react-router-dom"
import Logined, { LoginedSearchbar } from "./Logined"
import UnLoginned from "./unLoginned"
import { useAppSelector } from "@/app/ReduxHooks"

const Navbar = () => {
  let navigate= useNavigate()
  let data=useAppSelector(state=>state.credits)
  return (
    <nav className="w-screen z-50 md:h-[4rem] max-md:h-[5rem] bg-[var(--bg)] md:px-8 max-md:px-4 border-b border-gray-300 flex justify-between">
        
      <section className="flex   w-1/2 p-2 h-full items-center object-fit">
    <img src="/images/Records2.png" className="aspect-square rounded h-full cursor-pointer" alt="Records" onClick={()=>navigate("/")}/>
    {data.isLogined?
    <LoginedSearchbar/>:
    <h1 className="text-3xl  BFont cursor-pointer " onClick={()=>navigate("/")}>Records</h1>
  }
      </section>

      <section className="flex items-center  gap-x-8 w-1/2 justify-end ">
    {data.isLogined?

 <Logined/> :
<UnLoginned/>}
      </section>
    </nav>
  )
}

export default Navbar
