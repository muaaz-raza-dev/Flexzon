import { useAppDispatch, useAppSelector } from "@/app/ReduxHooks"
import { ChatInsertion } from "@/app/Slices/Messaging/EachChatSlice"
import { MessagingInsertion } from "@/app/Slices/Messaging/MessagingSlice"
import { Ichats } from "@/app/Types/Imessaging"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import moment from "moment"
import { Link, useParams } from "react-router-dom"
import SwipeableViews from 'react-swipeable-views';
import DeleteChat from "./DeleteChat.chat"
import { FC } from "react"
import { InvitesChatComp } from "./InvitesChatComp.chat"
import OnlineCircle from "./OnlineCircle.chat"
const UsersChatSidebar = () => {
  let chats =useAppSelector(state=>state.messaging)
  return (
    <div className="flex flex-col h-full gap-y-1 ">
      {chats.SelectedTab=="Chats"?
      chats.chats.length!==0?
      chats.chats.map((elm)=><UserChatComp data={elm}/>):
      <NothingNarrator label="Chats"/>
      
      :
       chats.Invites.length!=0?
       chats.Invites.map((elm)=><InvitesChatComp data={elm}/>):
      <NothingNarrator label="Invites"/>      
      }

    </div>
  )
}
function UserChatComp({data}:{data:Ichats}){
  let id = useParams()
  let chats= useAppSelector(state=>state.messaging.chats)
  let dispatch = useAppDispatch()
  let MessageOpnerFunc=()=>{
         dispatch(MessagingInsertion({chats:chats.map(elm=>{
        if (elm._id==data._id) {
          return {...elm,unread:0}
        }
        else{return elm}
      })}))
      dispatch(ChatInsertion({user:data.Chatters,chatId:data._id,count:0}))
    
  }
 
    return (
      <SwipeableViews enableMouseEvents>
    <Link to={`/messaging/${data?._id}`} className={`flex py-4 border transition-colors rounded hover:text-white w-full px-4 items-center gap-x-4 hover:bg-[var(--secondary)] ${data._id==id["*"]?"bg-[var(--secondary)] text-white":""} cursor-pointer`} 
    onClick={MessageOpnerFunc}
      >
        <div className="flex relative">

        <Avatar className="h-16 w-16 flex aspect-square object-contain ">
            <AvatarImage src={data?.Chatters?.avatar} className=""/>
        </Avatar>
        {
    data.Chatters.Active&&
    <OnlineCircle/>
        }
        </div>
<div className="w-full">
<div className="hFont flex items-center gap-x-4 text-xl">
  <div className="flex gap-x-3 center">

  <h1>
  {data?.Chatters?.username}
  </h1>
  
            </div>
    {
    data._id!==id['*']&&data.unread!==0&&
    <div className="bg-[white] text-green-700 h-5 center rounded-full text-xs  aspect-square">{data.unread}</div>
     } 

</div>
<div className=" w-full text-xs text-nowrap flex justify-between gap-x-2  text-ellipsis ">
  <div className="flex justify-between items-center w-[90%] ">
    {data?.RecentMessage?.content||"Tap to start conversation."} 
    </div>
    <p>{data.RecentMessage?.delivered ?moment(data.RecentMessage?.delivered).format("LT"):""}</p>
    </div>
</div>
    </Link>
   <DeleteChat id={data._id}/>
    </SwipeableViews>
    )
}

const NothingNarrator:FC<{label:string}> = ({label}) => {
  return (
    <div className="flex justify-center items-center my-8">
      <div className="bg-gray-100 p-8 rounded-lg border border-gray-300 flex flex-col items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-gray-400 mb-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9 3a1 1 0 011-1h1a1 1 0 011 1v1h3a2 2 0 012 2v3a1 1 0 01-1 1h-1v2a2 2 0 01-2 2H9a2 2 0 01-2-2v-2H6a1 1 0 01-1-1V5a2 2 0 012-2h3V3zm3 7v1H8V9h4zm-1 3h2v2h-2v-2zM8 12h2v2H8v-2z"
            clipRule="evenodd"
          />
        </svg>
        <h2 className="text-2xl font-bold mb-4">No {label} Found</h2>
        <p className="text-gray-600 text-xs">There are currently no active {label} available.</p>
      </div>
    </div>
  )
}


export default UsersChatSidebar
