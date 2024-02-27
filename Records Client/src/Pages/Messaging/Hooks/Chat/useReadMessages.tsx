import GetChatMessages from "@/Queryfunctions/Messaging/GetChatMessage";
import { useAppDispatch, useAppSelector } from "@/app/ReduxHooks";
import { ChatInsertion } from "@/app/Slices/Messaging/EachChatSlice";
import { useMutation } from "react-query";
const useReadMessages = (chatId: string) => {
  let dispatch = useAppDispatch();
  let chats = useAppSelector((state) => state.chat.Chats);
  let data = useAppSelector((state) => state.chat);
  let mutation = useMutation({
    mutationKey: "sending message",
    mutationFn: () => GetChatMessages(chatId, data.count),
    onSuccess(resp) {
      dispatch(
        ChatInsertion({
          Chats: [ ...chats, ...resp.payload ].length<data.totalChats ? [ ...chats, ...resp.payload ] : resp.payload,
          count: resp.count,
          Invited:resp.Invited,
          user: resp.user,
          chatId: chatId,
          totalChats: resp.total,
        })
      );
 
    },
  });
  return mutation;
};

export default useReadMessages;
