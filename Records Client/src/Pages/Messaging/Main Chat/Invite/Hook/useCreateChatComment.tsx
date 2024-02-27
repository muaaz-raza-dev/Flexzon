import CreateChatComment from "@/Queryfunctions/Messaging/Invites/CreateChatComment";
import { useMutation } from "react-query";
import { useAppDispatch, useAppSelector } from "@/app/ReduxHooks";
import { InvitationStateInsertion } from "@/app/Slices/InvitationSlice";
import toast from "react-hot-toast";
const useCreateChatComment = (CommentId?:string,setInputToggle?:any) => {
    let dispatch=useAppDispatch()
    let Chats =useAppSelector(state=>state.Invitation.Chats)
    let mutation = useMutation({
      mutationKey: "Recieveing Message",
      mutationFn: ({ChatId,MessageId,Comment}:{ChatId:string,MessageId:string,Comment:string,}) => CreateChatComment(ChatId,MessageId,Comment,CommentId),
      onSuccess({payload}) {
        setInputToggle(false)
        dispatch(InvitationStateInsertion({Chats:
        Chats.map(elm=>{
          if (elm._id ==payload.MessageId) {
            return {...elm,Commented:true,Comments:{_id:payload._id,Comment:payload.Comment}}
          }
          else return elm
        })
        }))
      },
      onError(){
        toast.error("An error occured on the server")
      }
    });
    return mutation;
}

export default useCreateChatComment
