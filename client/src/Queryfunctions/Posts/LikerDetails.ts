import Cookies from "js-cookie";
import Axios from "../axios";

const getLikersFn = async (PostId: string) => {
  let response = await Axios.get(
    `/like/getlikers`,
    {
      headers: { "auth-token": Cookies.get("Records_session") ,"id":PostId},
    }
  );
  return response.data.payload;
};

export default getLikersFn;
