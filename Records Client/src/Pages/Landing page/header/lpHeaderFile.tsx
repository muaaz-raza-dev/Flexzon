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
      <div  className={` z-40 mt-1 ${ data.selectedTabs===value&&'!text-white !bg-[var(--primary)]'} flex items-center text-sm h-full bg-gray-200 p-2 rounded-lg text-gray-600 text-nowrap cursor-pointer hover:text-[var(--primary)] transition-colors `} onClick={()=>{
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
    <section className="overflow-x-auto overflow-y-hidden pt-3  px-4 py-2 flex gap-x-4 
    bg-[var(--bg)] z-[30]   w-screen Headerlp  border-b items-center sticky top-0 h-14 " >
        <a href="#" className="p-1   rounded cursor-pointer 
        hover:text-[var(--primary)]">
<Home className="max-md:w-6 md:w-6 " size={28} />
        </a>
        {
   data.tabs.slice(0,15).map((elm)=>{  
            return <HeaderLabels  value={elm.title} />
        })}
    </section>
  )
}