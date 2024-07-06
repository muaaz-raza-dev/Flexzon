import { GetChats } from "@/Queryfunctions/Messaging/GetAllChats"
import { useAppDispatch} from "@/app/ReduxHooks"
import { MessagingInsertion } from "@/app/Slices/Messaging/MessagingSlice"
import { useQuery } from "react-query"
const useGetAllChats = () => {
let dispatch=useAppDispatch()
let query= useQuery({queryKey:"All chats",queryFn:()=>GetChats(),staleTime:60*1000,refetchOnWindowFocus:false ,
onSuccess(data) {
    dispatch(MessagingInsertion({chats:data.payload,Invites:data.Invites}))
},
onError() {
   
},
})
return query
}

export default useGetAllChats
