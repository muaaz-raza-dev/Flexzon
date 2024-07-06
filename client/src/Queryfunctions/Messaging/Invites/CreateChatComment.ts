import Cookies from "js-cookie";
import Axios from "../../axios";
const CreateChatComment = async (ChatId:string,MessageId:string,Comment:string,CommentId?:string) => {
  let response = await Axios.post(
    `/chats/invites/AddComment`,
    { ChatId,MessageId,Comment , CommentId },
    { headers: { "auth-token": Cookies.get("Records_session") } }
  );
  return response.data;
};
export default CreateChatComment;
