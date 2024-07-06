import Cookies from "js-cookie";
import Axios from "../../axios";
const ReadInvitedMessages = async (InvitationId: string,count:number) => {
  let response = await Axios.post(
    `/chats/invites/readMessages`,
    { InvitationId,count },
    { headers: { "auth-token": Cookies.get("Records_session") } }
  );
  return response.data;
};

export default ReadInvitedMessages;
