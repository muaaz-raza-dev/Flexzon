import Cookies from "js-cookie";
import Axios from "../axios";

const LikeComment = async(CommentId:string) => {
    let response = await Axios.post(`/comments/like/${CommentId}`,{},{headers:{"auth-token":Cookies.get("Records_session")}});
    return response.data;
}
export default LikeComment