import Cookies from "js-cookie";
import Axios from "../axios";

const DeleteFn = async(id:string) => {
        let response = (await Axios.delete(`/posts/upload/delete/${id}`,{
            headers:{"auth-token":Cookies.get("Records_session")}
        }));
        return response.data;
}


export default DeleteFn
