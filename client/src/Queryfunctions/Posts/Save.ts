import Cookies from "js-cookie";
import Axios from "../axios";
export interface Ilike{
    PostId:string;
    LikerId:string;
}
const SaveFn = async(PostId:string) => {
        let response = (await Axios.post(`/save`,{PostId},{
            headers:{"auth-token":Cookies.get("Records_session")}
        }));
        return response.data;
}

export default SaveFn
