import { SendMessage } from "@/Queryfunctions/Messaging/SendMessage"
import { useAppDispatch, useAppSelector } from "@/app/ReduxHooks"
import { ChatInsertion } from "@/app/Slices/Messaging/EachChatSlice"
import { useMutation } from "react-query"
import useGetAllChats from "../../Sidebar/useGetAllChats"
const useSendMessage = () => {
    let dispatch = useAppDispatch()
    let chats = useAppSelector(state=>state.chat.Chats)
    let data = useAppSelector(state=>state.chat)
    let socket =useAppSelector(state=>state.messaging.socket)
    let {refetch} = useGetAllChats()
 let mutation=useMutation({
    mutationKey:"sending message",
    mutationFn:(content:string)=>SendMessage(content,data.chatId,data.user._id),
 onSuccess(data){
dispatch(ChatInsertion({Chats:[...chats,data.payload ]} ))
refetch()
socket.emit("SendMessage",data.payload  )
 }
})
return {...mutation}
}

export default useSendMessage
