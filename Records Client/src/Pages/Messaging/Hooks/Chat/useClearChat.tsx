import DeleteAllChats from "@/Queryfunctions/Messaging/DeleteAllChats";
import { useAppDispatch, useAppSelector } from "@/app/ReduxHooks";
import { ChatInsertion } from "@/app/Slices/Messaging/EachChatSlice";
import { useMutation } from "react-query";


const useClearChat = () => {
    let chatId =useAppSelector(state=>state.chat.chatId)
    let dispatch =useAppDispatch()
    let mutation = useMutation({
        mutationKey: "Deleting Message",
        mutationFn: () => DeleteAllChats(chatId),
        onSuccess() {
          dispatch(
            ChatInsertion({
              Chats:  [  ] ,
              count: 0,
              totalChats: 0,
            })
          );
   
        },
      });
      return mutation;
}

export default useClearChat
