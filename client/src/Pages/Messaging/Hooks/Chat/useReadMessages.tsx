import GetChatMessages from "@/Queryfunctions/Messaging/GetChatMessage";
import { useAppDispatch, useAppSelector } from "@/app/ReduxHooks";
import { ChatInsertion } from "@/app/Slices/Messaging/EachChatSlice";
import { useMutation } from "react-query";
import OptimizedChat from "./OptimizedChat";
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
          Chats: resp.count>1 ? OptimizedChat(resp.payload,chats) : resp.payload,
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
