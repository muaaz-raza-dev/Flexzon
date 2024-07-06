import { IeachChatP } from "./Ichat";
import { Iinvites } from "./Imessaging";
export interface IChatComment{
_id:string,
Comment:string,
UserId:{
    username:string,
    avatar:string
};
CreatedAt:string
}
export interface IeachInviteChat extends IeachChatP{
    Comments:IChatComment

}
export interface IinvitationState{
    Invitation:Iinvites;
Chats:IeachInviteChat[];
count:number;
chatId:string;
InvitationId:string;
totalChats:number;
}
