import { useAppDispatch, useAppSelector } from "@/app/ReduxHooks"
import { userDetailsInsertion } from "@/app/Slices/UserDetailsSilce"
import { Bookmark, Grid2X2, UserRoundX } from "lucide-react"
import { FC } from "react"

const UPostHeader = () => {
    let data=useAppSelector(state=>state.userDetails)
    let dispatch=useAppDispatch()
  return (
    <div className="md:w-[85%] max-md:w-[92%] mb-5 gap-x-8 center w-full  ">
        {data.tabs.map(elm=>{
            return(
        <button onClick={()=>{
            dispatch(userDetailsInsertion({selectedTab:elm}))
        }} className={`${elm==data.selectedTab && "border-black border-t-2 text-[var(--primary)]" } text-lg hFont flex gap-x-2 items-center p-2`} >
<UPostHeaderIcon tab={elm}/>   {elm}
            </button> 
        )    
    })
    }
    </div>
  )
}


const UPostHeaderIcon:FC<{tab:string}> = ({tab}) => {
    if (tab =="Posts") {
return(
<>
<Grid2X2 size={18}/>
</>)
        
    }

    if (tab =="Saved") {
        return(
        <>
        <Bookmark size={18}/>
      
        </>)
                
            }

            else  {
                return(
                <>
                <UserRoundX size={18}/>
              
                </>)
                        
                    }
}

export default UPostHeader
