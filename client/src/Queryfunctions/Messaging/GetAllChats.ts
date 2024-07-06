import Cookies from "js-cookie"
import Axios from "../axios"
export const GetChats = async() => {
let response = await Axios.get(`/chats/AllChats`,
{headers:{"auth-token":Cookies.get("Records_session")}})
return response.data
}