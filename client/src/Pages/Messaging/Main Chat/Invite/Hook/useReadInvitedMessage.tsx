import ReadInvitedMessages from "@/Queryfunctions/Messaging/Invites/ReadInviteMessages";
import { useAppDispatch, useAppSelector } from "@/app/ReduxHooks";
import { InvitationStateInsertion } from "@/app/Slices/InvitationSlice";
import { useMutation } from "react-query";
import { useParams } from "react-router-dom";
const useReadInvitedMessages = () => {
  let dispatch = useAppDispatch();
  let chats = useAppSelector((state) => state.Invitation.Chats);
  let data = useAppSelector((state) => state.Invitation);
  let {id:InvitationId}=useParams()
//   let socket = useAppSelector((state) => state.messaging.socket);
  let mutation = useMutation({
    mutationKey: "Recieveing Message",
    mutationFn: () => ReadInvitedMessages(InvitationId||data.Invitation._id,data.count),
    onSuccess(resp) {
      dispatch(
        InvitationStateInsertion({
          Chats: resp.count != 0 ? [ ...chats, ...resp.payload ] : resp.payload,
          count: resp.count,
          chatId: resp.chatId,
          Invitation:resp.Invitation,
          totalChats: resp.total,
        })
      );
    //   data.count == 0 && socket.emit("join", chatId);
    },
  });
  return mutation;
};

export default useReadInvitedMessages;
