import { useAppDispatch, useAppSelector } from "@/app/ReduxHooks"
import { MessagingInsertion } from "@/app/Slices/Messaging/MessagingSlice"
import {useNavigate } from "react-router-dom"

const HeaderTabSidebar = () => {
    let {Tabs,SelectedTab} =useAppSelector(state=>state.messaging)
    let dispatch=useAppDispatch()
    let navigate =useNavigate()
  return (
    <div className="w-full bg-[var(--secondary)] text-white">
      {Tabs.map(elm=>{
        return <button key={elm} onClick={()=>{
          elm!="Chats"? navigate("/messaging/invite"):navigate("/messaging")
            dispatch(MessagingInsertion({SelectedTab:elm}))
        }} 
        className={`w-1/2 py-2 text-xl hFont bg-[var(--bg)] text-black 

        ${SelectedTab==elm&&"bg-[var(--transparent)]  text-white "} `}
        >
          {elm}
          </button>
      })}
    </div>
  )
}

export default HeaderTabSidebar
