import DeleteConversation from "@/Queryfunctions/Messaging/DeleteConversation";
import { useMutation } from "react-query";
import useGetAllChats from "../../Sidebar/useGetAllChats";
import { useNavigate } from "react-router-dom";


const useDeleteConversation = () => {
    let {refetch} =useGetAllChats()
    let navigate = useNavigate()
    let mutation = useMutation({
        mutationKey: "Deleting Chat",
        mutationFn: (chatId:string) => DeleteConversation(chatId),
        onSuccess() {
            navigate("/messaging")
       refetch()
   
        },
      });
      return mutation;
}

export default useDeleteConversation
