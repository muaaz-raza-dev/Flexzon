import Cookies from "js-cookie";
import Axios from "../axios";

const FollowTopicFn = async(id:string) => {
        let response = (await Axios.post(`/topic/follow/${id}`,{},
        {headers:{"auth-token":Cookies.get("Records_session")}}
        ));
        return response.data;
}

export default FollowTopicFn
