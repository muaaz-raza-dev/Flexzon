import Cookies from "js-cookie"
import Axios from "../axios"
const DeleteConversation = async(chatId:string) => {
    let response = await Axios.post(`/chats/deleteConversations`,{chatId},
    {headers:{"auth-token":Cookies.get("Records_session")}})
    return response.data
}

export default DeleteConversation
