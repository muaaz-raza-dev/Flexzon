import { FC,  MutableRefObject, useEffect, useRef, useState } from "react"
import {ChevronRight,} from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/app/ReduxHooks"
import { insertion } from "@/app/Slices/LandingSlice"
import FetchBlogs from "@/Queryfunctions/Hooks/useFetchBlogs"

export const HeaderLabels:FC<{value:string}> = ({value}) => {
  let data=useAppSelector(state=>state.landing)
  let Credits=useAppSelector(state=>state.credits)
  let dispatch=useAppDispatch()
return (
      <div  className={`  mt-1 ${ data.selectedTabs===value&&'!text-white !bg-[var(--primary)]'} flex items-center text-sm h-full 
        bg-[var(--accent)] font-medium tracking-wider hover:bg-[#c0bfbf] p-2 px-4 rounded-2xl text-black text-nowrap cursor-pointer hover:text-[var(--primary)] transition-colors `} 
      onClick={()=>{
        dispatch(insertion({selectedTabs:value,Blogs:[],count:0}))
          FetchBlogs<typeof dispatch>({...data,selectedTabs:value,Blogs:[],count:0},dispatch,Credits)
  }}>
          {value}
      </div>
    )
  }

export const LpHeaderFile = () => {
  let data=useAppSelector(state=>state.landing)
  let ContainerRef:MutableRefObject<HTMLElement|null> = useRef<HTMLElement>(null)
  const [RightorLeft, setRightorLeft] = useState<"Right"|"Left"|"none"|"both">("none");

  useEffect(() => {
HandleSlide(0)
  }, []);
  let HandleSlide = (offset:number)=>{
    let containerscrollL = ContainerRef.current?.scrollLeft??0
    let Containerwidth  = ContainerRef.current?.clientWidth??0
    let containerscrollR = -(ContainerRef.current?.scrollLeft??0)+(ContainerRef.current?.scrollWidth??0) - Containerwidth


    if ( ContainerRef.current) {
      ContainerRef.current.scrollLeft += offset
    }
    if (containerscrollL+offset<50&&containerscrollR-offset<50) {
    setRightorLeft("none")  
    }
    
    else if (containerscrollR-offset>50&&containerscrollL+offset>50) setRightorLeft("both")
    else if (containerscrollR-offset<50) setRightorLeft("Left")
    else if (containerscrollL+offset<50) setRightorLeft("Right")
  }
  return (
    <div className="flex w-full center  sticky top-0 h-14   max-md:pl-2 rounded-md z-[30] bg-[var(--bg)]">
   <div className={` px-4 bg-[var(--bg)] z-10 absolute left-2 w-8 center  ${   ( RightorLeft=="Left"||RightorLeft=="both")?" visible":"invisible"}`}>
        <button onClick={()=>HandleSlide(-200)} className=" rounded bg-[var(--primary)] text-white hover:bg-slate-600 z-20  aspect-square HeaderLShadow   p-2 "><ChevronRight size={16}/></button>
      </div>
    <section className=" px-1 overflow-x-auto relative  overflow-y-hidden pt-3   py-2 flex gap-x-4 
   scroll-smooth  w-screen Headerlp rounded-md items-center   " ref={ContainerRef}>
  


        {
          data.tabs.slice(0,15).map((elm)=>{  
            return <HeaderLabels   value={elm.title} />
          })}

      </section>
<div className={` px-4 relative  right-2 w-8 z-20 center  ${   ( RightorLeft=="Right"||RightorLeft=="both")?" visible":"invisible"}`}>
        <button onClick={()=>HandleSlide(200)} className=" rounded bg-[var(--primary)] text-white hover:bg-slate-600  aspect-square HeaderLShadow   p-2 "><ChevronRight size={16}/></button>
      </div>
     
        
          </div>
  )
}