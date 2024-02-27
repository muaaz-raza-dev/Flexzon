import { IChatComment } from "./IInvitation";
export interface IeachChatP{
    sender:Iuser,
    receiver:Iuser,
    content:string,
    delivered:string,
    Commented:boolean,
    read:boolean,
    _id:string
    chatId:string
    sent:boolean //sent or recieved
}

export interface IeachChat extends IeachChatP{
    Comments:IChatComment[]
    
}
export interface Iuser{
    username:string;
    avatar:string;
    LastLogin:string
    Active:boolean;
    _id:string
}
export interface IinvitedUserState {InvitedMember:Iuser,_id:string}
export interface IchatsState{
user:Iuser
Chats:IeachChat[];
Invited:IinvitedUserState[]
count:number;
chatId:string;
totalChats:number;
opponentOnline:boolean;
Typing:boolean
}