import { useMutation } from "react-query";
import toast from "react-hot-toast";
import EndInvitebyUser, { EndInvitebyAdmin } from "@/Queryfunctions/Messaging/Invites/EndInvitebyUser";
import { useNavigate } from "react-router-dom";
import useGetAllChats from "@/Pages/Messaging/Sidebar/useGetAllChats";
import { useAppDispatch, useAppSelector } from "@/app/ReduxHooks";
import { ChatInsertion } from "@/app/Slices/Messaging/EachChatSlice";

const useEndInviteUser = () => {
    let navigate = useNavigate()
    let {refetch} = useGetAllChats()
    let mutation = useMutation({
      mutationKey: "Deleting Message",
      mutationFn: (InvitationId:string) => EndInvitebyUser(InvitationId),
      onSuccess() {
refetch()
      navigate("/messaging/invite")
     toast.success("Your exited from chat ")
      },
      onError(){
        toast.error("An error occured on the server")
      }
    });
    return mutation;
}


export const useEndInviteAdmin = () => {
    let dispatch  =useAppDispatch()
    let {Invited} =useAppSelector(state=>state.chat)
    let mutation = useMutation({
      mutationKey: "Deleting Message",
      mutationFn: (InvitationId:string) => EndInvitebyAdmin(InvitationId),
      onSuccess(resp) {
        dispatch(ChatInsertion({Invited:Invited.filter(elm=>elm._id!==resp.payload)}))
        toast.success("Successfully romoved from your chat ")

      },
      onError(){
        toast.error("An error occured on the server")
      }
    });
    return mutation;
}

export default useEndInviteUser
