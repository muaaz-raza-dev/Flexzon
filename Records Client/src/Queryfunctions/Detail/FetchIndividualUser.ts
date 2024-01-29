
import Axios from "../axios";

const FetchIndividualUser = async (id: string) => {
  let response = await Axios.get(`/profile/${id}`);
  
  return response.data;
};

export default FetchIndividualUser;
