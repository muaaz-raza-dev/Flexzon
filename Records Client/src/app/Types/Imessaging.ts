import { Socket } from "socket.io-client";
import { IeachChat } from "./Ichat";

export interface Ichats {
    Chatters:{
        username:string;
        avatar:string,
        LastLogin:string,
        Active:boolean;
        _id:string //chatter's id
    }
_id: string //chat_id
unread:number
RecentMessage:IeachChat,
}
export interface Iinvites{
ChatId:{ //Chat Details
    Chatters:{
        username:string;
        avatar:string,
        Active:string
        _id:string //chatter's id
    }[]
    _id: string //chat_id
},
InvitedBy:{
    username:string;
    avatar:string,
    Active:string
    _id:string //chatter's id
},
InvitedAt:string,
_id:string
}

export interface Imessaging<T>{
socket: Socket|T
chats:Ichats[],
newMessages:number;
Tabs:string[],
Invites:Iinvites[]
SelectedTab:string;
ConnectedUsers:string[];
Searched:{username:string,avatar:string,_id:string}[]
SearchDialog:{Open:boolean,purpose:"invitation"|"search"}
}