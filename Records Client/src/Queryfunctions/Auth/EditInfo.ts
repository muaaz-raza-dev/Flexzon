import Axios from "../axios"
import Cookies from "js-cookie"
interface Info {

    username:string
    avatar:string,
    email:string,
    Name:string,
    bio:string,

}
const EditInfo = async({ Name, username, bio, email, avatar,}:Info) => {
let response = await Axios.put("/auth/update",{ Name, username, bio, email, avatar},{headers:{"auth-token":Cookies.get("Records_session")}})
return response.data
}

export default EditInfo
