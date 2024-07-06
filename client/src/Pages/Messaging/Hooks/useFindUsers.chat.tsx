import { SearchUsers } from "@/Queryfunctions/Messaging/Search"
import { useAppDispatch, useAppSelector } from "@/app/ReduxHooks"
import { MessagingInsertion } from "@/app/Slices/Messaging/MessagingSlice"
import { useMutation } from "react-query"

const useFindUsers = () => {
    let dispatch = useAppDispatch()
    let chatId = useAppSelector(state=>state.chat.chatId)
    let invite = useAppSelector(state=>state.messaging.SearchDialog.purpose)=="invitation"
    
 let mutation=useMutation({mutationKey:"fetching user to chat",
 mutationFn:(username:string,)=>SearchUsers(username,chatId,invite) , onSuccess(data){
dispatch(MessagingInsertion({Searched:data.payload}))
 }})
 return mutation
}

export default useFindUsers
