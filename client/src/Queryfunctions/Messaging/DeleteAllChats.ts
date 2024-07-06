import Cookies from "js-cookie"
import Axios from "../axios"
const DeleteAllChats = async(chatId:string) => {
    let response = await Axios.post(`/chats/delete`,{chatId},
    {headers:{"auth-token":Cookies.get("Records_session")}})
    return response.data
}

export default DeleteAllChats
