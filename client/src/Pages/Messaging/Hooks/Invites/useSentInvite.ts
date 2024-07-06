import SentInvitation from "@/Queryfunctions/Messaging/Invites/Invite";
import { useAppDispatch } from "@/app/ReduxHooks";
import { MessagingInsertion } from "@/app/Slices/Messaging/MessagingSlice";
import toast from "react-hot-toast";
import { useMutation } from "react-query";

const useSentInvite = () => {
  let dispatch = useAppDispatch();
   let mutationState= useMutation({
    mutationKey: "Inviting to chat",
    mutationFn: ({chatId,InvitedMember}:{chatId: string, InvitedMember: string}) => SentInvitation(chatId, InvitedMember),
    onSuccess() {
    toast.success("User Invited successfully")
    dispatch(MessagingInsertion({ SearchDialog:{Open:false,purpose:"search"} ,Searched:[]}));
    },
  });
  return mutationState ;
};

export default useSentInvite;