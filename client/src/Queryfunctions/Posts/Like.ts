import Cookies from "js-cookie";
import Axios from "../axios";
export interface Ilike{
    PostId:string;
    LikerId:string;
}
const LikeFn = async(PostId:string,LikerId:string) => {
        let response = (await Axios.post(`/like`,{PostId,LikerId},{
            headers:{"auth-token":Cookies.get("Records_session")}
        }));
        return response.data;
}

export default LikeFn
