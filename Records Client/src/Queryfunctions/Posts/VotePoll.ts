import Cookies from "js-cookie";
import Axios from "../axios";
import { IPoll } from "@/app/Types/Ilanding";
const VotePollFn = async(Poll:IPoll,title:string) => {
        let response = (await Axios.post(`/vote/poll`,{Poll,title},{
            headers:{"auth-token":Cookies.get("Records_session")}
        }));
        return response.data;
}

export const VoteQ = async(Question:IPoll,title:string) => {
    let response = (await Axios.post(`/vote/question`,{Question,title},{
        headers:{"auth-token":Cookies.get("Records_session")}
    }));
    return response.data;
}
export default VotePollFn
