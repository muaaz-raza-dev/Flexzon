import { useAppDispatch, useAppSelector } from "@/app/ReduxHooks";
import { ChatInsertion } from "@/app/Slices/Messaging/EachChatSlice";
import { useEffect } from "react";
import notificationSound from "../../../../../../public/audio/Notification.mp3"
import useGetAllChats from "@/Pages/Messaging/Sidebar/useGetAllChats";
import ReturnAllChatsId from "@/Queryfunctions/Hooks/ReturnAllChatsId";
const useSocketHandler = () => {
  let {refetch}=useGetAllChats()
    let socket =useAppSelector(state=>state.messaging.socket)
      let dispatch = useAppDispatch()
      let messaging = useAppSelector(state=>state.messaging)
      let MyId=useAppSelector(state=>state.credits.Info._id)
    let Id =useAppSelector(state=>state.credits.Info._id)
    let isLogined =useAppSelector(state=>state.credits.isLogined)
    useEffect(() => {
    let audio = new Audio(notificationSound)
  socket.on("message",(data)=>{
    dispatch(ChatInsertion({newMessage:{...data,sent:data.Sender==Id},Typing:false} ))
    audio.play()
})
socket.on("new_user_online",()=>{
refetch()
    // dispatch(MessagingInsertion({ConnectedUser:[...new Set(users)]}))
})



socket.on("TypingState",(Typing)=>{   
    dispatch(ChatInsertion(Typing))
})
return ()=>{
  audio.remove()
  socket.off("message");
  socket.off("new_user_online");
  socket.off("TypingState");
}
}, [socket]);

useEffect(() => {
  isLogined&& messaging.socket.emit("join", {ChatIds:ReturnAllChatsId<typeof messaging.socket>({...messaging,chats:messaging.chats,Invites:messaging.Invites}),userId:MyId});
}, [isLogined]);
}

export default useSocketHandler
