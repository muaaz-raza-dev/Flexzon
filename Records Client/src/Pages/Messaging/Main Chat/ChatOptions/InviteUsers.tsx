import { Users } from "lucide-react"
import { useAppDispatch } from "@/app/ReduxHooks"
import { MessagingInsertion } from "@/app/Slices/Messaging/MessagingSlice"
const InviteUsers = () => {
    let dispatch = useAppDispatch()
  return (

    <div onClick={()=>{
        dispatch(MessagingInsertion({SearchDialog:{Open:true,purpose:"invitation"}}))
    }} className="flex gap-x-1 p-1 border hover:border-black center cursor-pointer">
    <Users size={16}/> Invite user</div>

  )
}

export default InviteUsers
