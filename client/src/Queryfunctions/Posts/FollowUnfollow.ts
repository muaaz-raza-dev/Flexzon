import Cookies from "js-cookie";
import Axios from "../axios";

const FollowFn = async(toFollow:string) => {
        let response = (await Axios.post(`/connections/follow`,{toFollow},{
            headers:{"auth-token":Cookies.get("Records_session")}
        }));
        return response.data;
}

export const unFollowFn = async(toUnFollow:string) => {
    let response = (await Axios.post(`/connections/unfollow`,{toUnFollow},{
        headers:{"auth-token":Cookies.get("Records_session")}
    }));
    return response.data;
}
export default FollowFn
