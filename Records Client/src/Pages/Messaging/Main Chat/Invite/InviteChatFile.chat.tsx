import { useParams } from "react-router-dom"
import { useEffect } from "react"
import useSocketHandler from "../../Hooks/Chat/socket/useSocketHandler"
import HeaderInvitedChat from "./HeaderInvitedChat"
import useReadInvitedMessages from "./Hook/useReadInvitedMessage"
import { useAppDispatch } from "@/app/ReduxHooks"
import { MessagingInsertion } from "@/app/Slices/Messaging/MessagingSlice"
import { SmallLoader } from "@/Essentials/Loader"
import InvitedMainChat from "./InvitedMainChat.chat"
    
    const InviteChatFile = () => {
    let {id}=useParams()
    let {mutate,isLoading}=useReadInvitedMessages()
    let dispatch = useAppDispatch()
    useSocketHandler()
    useEffect(() => {
      mutate()
        dispatch(MessagingInsertion({SelectedTab:"Invites",}))
    }, [id]);
    return (
      <div className=" w-full  h-full flex flex-col justify-between">
            <HeaderInvitedChat/>
            {
              isLoading?<SmallLoader/>:
            <InvitedMainChat/>
            }
            </div>
  )
}

export default InviteChatFile
