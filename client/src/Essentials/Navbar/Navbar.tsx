
import { useNavigate } from "react-router-dom"
import Logined, { LoginedSearchbar } from "./Logined"
import UnLoginned from "./unLoginned"
import { useAppSelector } from "@/app/ReduxHooks"
import { FC } from "react"
import Common from "./Common"

const Navbar:FC<{transparent?:boolean}> = ({transparent}) => {
  let navigate= useNavigate()
  let data=useAppSelector(state=>state.credits)
  return (
    <nav className={`w-full z-50 md:h-[6dvh] max-md:h-[8dvh] bg-[var(--bg)] md:px-8 max-md:px-4  flex justify-between ${transparent ?"morphismBg" :"border-b "}`}>
      <section className="flex  w-1/2 p-2  items-center aspect-square">
    <img src="/images/Records2.png" className=" !aspect-square  object-contain   cursor-pointer h-full " alt="Records" onClick={()=>navigate("/")}/>
    {data.isLogined?
    <LoginedSearchbar/>:
    <h1 className="text-3xl font-semibold  BFont cursor-pointer " onClick={()=>navigate("/")}>Flexzon</h1>
  }
      </section>
      <section className="flex items-center  gap-x-3 w-1/2 justify-end ">
    {data.isLogined?
    <>
 <Common/>
 <Logined/> 
    </>
 :
 
<UnLoginned/>}
      </section>
    </nav>
  )
}

export default Navbar
