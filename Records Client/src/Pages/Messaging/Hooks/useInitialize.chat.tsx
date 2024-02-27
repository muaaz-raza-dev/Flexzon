import InitializeChat from "@/Queryfunctions/Messaging/InitializeChat";
import { useAppDispatch, useAppSelector } from "@/app/ReduxHooks";
import { MessagingInsertion } from "@/app/Slices/Messaging/MessagingSlice";
import { useMutation } from "react-query";

const useInitializeChat = () => {
  let dispatch = useAppDispatch();
  let chats = useAppSelector(state=>state.messaging.chats)
  let mutationState= useMutation({
    mutationKey: "adding to chat",
    mutationFn: (member2: string) => InitializeChat(member2),
    onSuccess(data) {
      dispatch(MessagingInsertion({ chats: [...chats,data.payload],Searched:[] }));
    },
  });
  return { ...mutationState };
};

export default useInitializeChat;
