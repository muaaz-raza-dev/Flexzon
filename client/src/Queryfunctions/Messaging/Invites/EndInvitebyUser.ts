import Cookies from "js-cookie";
import Axios from "../../axios";
const EndInvitebyUser = async(InvitationId: string) => {
  let response = await Axios.post(
    `/chats/invites/EndInviteByUser`,
    { InvitationId },
    { headers: { "auth-token": Cookies.get("Records_session") } }
  );
  return response.data;
};

export const EndInvitebyAdmin = async(InvitationId: string) => {
  let response = await Axios.post(
    `/chats/invites/EndInviteByAdmin`,
    { InvitationId },
    { headers: { "auth-token": Cookies.get("Records_session") } }
  );
  return response.data;
};


export default EndInvitebyUser;
