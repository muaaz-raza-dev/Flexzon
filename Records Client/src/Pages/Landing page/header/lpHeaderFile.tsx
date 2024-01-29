import { FC } from "react"


import {Home} from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/app/ReduxHooks"
import { insertion } from "@/app/Slices/LandingSlice"
import FetchBlogs from "@/Queryfunctions/Hooks/useFetchBlogs"
export const HeaderLabels:FC<{value:string}> = ({value}) => {
  let data=useAppSelector(state=>state.landing)
  let Credits=useAppSelector(state=>state.credits)
  let dispatch=useAppDispatch()
return (
      <div  className={` z-40 ${ data.selectedTabs===value&&'border-b-2 border-[var(--primary)]'} flex items-center text-sm h-full text-gray-600 text-nowrap cursor-pointer hover:text-[var(--primary)] transition-colors `} onClick={()=>{
        window.screenY=0
        dispatch(insertion({selectedTabs:value,Blogs:[],count:0}))
          FetchBlogs<typeof dispatch>({...data,selectedTabs:value,Blogs:[],count:0},dispatch,Credits)
  }}>
          {value}
      </div>
    )
  }

export const LpHeaderFile = () => {
  let data=useAppSelector(state=>state.landing)
  return (
    <section className="overflow-auto px-4 pb-1 flex gap-x-8 bg-[var(--bg)] z-[40]  w-screen Headerlp  border-b items-center sticky -top-1 h-14 " >
        <a href="#" className="p-1   rounded cursor-pointer 
        hover:text-[var(--primary)]">
<Home className="max-md:w-6 md:w-6 ml-4" size={28} />
        </a>
        {
   data.tabs.map((elm)=>{  
            return <HeaderLabels  value={elm.title}/>
        })}
    </section>
  )
}