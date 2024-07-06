import Cookies from "js-cookie";
import Axios from "../axios";
export const SendMessage = async (
  content: string,
  chatId: string,
  receiver: string
) => {
  let response = await Axios.post(
    `/chats/send`,
    {content,chatId,receiver},
    { headers: { "auth-token": Cookies.get("Records_session") } }
  );
  return response.data;
};
