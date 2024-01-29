import Axios from "../axios"
import Cookies from "js-cookie"
interface Info {

    username:string
    avatar:string,
    email:string,
    Name:string,
    bio:string,
    contact:any,dob:any,website:any,gender:any,Links:any
}
const EditInfo = async({ Name, username, bio, email, avatar,contact,dob,website,gender,Links}:Info) => {
    
let response = await Axios.put("/auth/update",{ Name, username, bio, email, avatar,contact,dob,website,gender,Links},{headers:{"auth-token":Cookies.get("Records_session")}})
return response.data
}

export default EditInfo
