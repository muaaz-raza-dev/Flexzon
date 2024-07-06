
import Cookies from "js-cookie";
import Axios from "../axios";

const FetchIndividualUser = async (id: string) => {
  let response = await Axios.get(`/profile/${id}`);
  
  return response.data;
};

export const CatchProfileviewer = async (id: string) => {
  let response = await Axios.get(`/profile/viewer/${id}`,{headers:{"auth-token":Cookies.get("Records_session")}});
  
  return response.data;
};

export default FetchIndividualUser;
