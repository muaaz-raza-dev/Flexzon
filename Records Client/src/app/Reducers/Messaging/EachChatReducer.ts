import { IchatsState, IeachChat, IinvitedUserState, Iuser } from "@/app/Types/Ichat";
import { PayloadAction } from "@reduxjs/toolkit/react";

interface IChatAction{
    user?:Iuser
    Chats?:IeachChat[];
    count?:number;
    chatId?:string;
    totalChats?:number;
    newMessage?:IeachChat
    opponentOnline?:boolean,
    Invited?:IinvitedUserState[];
    Typing?:boolean
}
const ChatInsert = (state: IchatsState, action: PayloadAction<IChatAction>) => {
    let {payload}=action
if (payload.user!==undefined) state.user=payload.user
if (payload.Typing!==undefined) state.Typing=payload.Typing

if (payload.Invited!==undefined) state.Invited=payload.Invited
if (payload.newMessage!==undefined) state.Chats.push(payload.newMessage)
if (payload.opponentOnline!==undefined) state.opponentOnline=payload.opponentOnline
if (payload.Chats!==undefined) state.Chats=payload.Chats
if (payload.count!==undefined) state.count=payload.count
if (payload.chatId!==undefined) state.chatId=payload.chatId
if (payload.totalChats!==undefined) state.totalChats=payload.totalChats
  };


export default ChatInsert