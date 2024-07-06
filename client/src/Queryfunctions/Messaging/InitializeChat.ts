import Cookies from "js-cookie"
import Axios from "../axios"


const InitializeChat = async(member2:string) => {
    let response = await Axios.post(`/chats/InitializeChat`,{member2},
    {headers:{"auth-token":Cookies.get("Records_session")}})
    return response.data
}

export default InitializeChat
