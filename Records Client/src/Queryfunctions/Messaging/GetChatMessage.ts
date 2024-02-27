import Cookies from "js-cookie"
import Axios from "../axios"

const GetChatMessages =async (chatId:string,count:number) => {
    let response = await Axios.post(`/chats/chat`,{chatId,count,},
    {headers:{"auth-token":Cookies.get("Records_session")}})
    return response.data
}

export default GetChatMessages
