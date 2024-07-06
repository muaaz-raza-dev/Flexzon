import Cookies from "js-cookie";
import Axios from "../axios";

const UploadComment = async(content:string,post:string,replied?:string,Replied?:boolean) => {
    let response = await Axios.post(`/comments/create`,{content,post,replied,Replied},{headers:{"auth-token":Cookies.get("Records_session")}});
    return response.data;
  
  
}
export default UploadComment