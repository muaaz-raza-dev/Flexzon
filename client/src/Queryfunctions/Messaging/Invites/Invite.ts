import Cookies from "js-cookie";
import Axios from "../../axios";
const SentInvitation = async (chatId: string, InvitedMember: string) => {
  let response = await Axios.post(
    `/chats/invites`,
    { chatId,InvitedMember },
    { headers: { "auth-token": Cookies.get("Records_session") } }
  );
  return response.data;
};

export default SentInvitation;
