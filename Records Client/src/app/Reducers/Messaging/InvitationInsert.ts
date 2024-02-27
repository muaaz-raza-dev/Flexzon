import { IinvitationState } from "@/app/Types/IInvitation";
import { IeachChat,} from "@/app/Types/Ichat";
import { Iinvites } from "@/app/Types/Imessaging";
import { PayloadAction } from "@reduxjs/toolkit/react";

interface IInviteAction{
    Invitation?:Iinvites
    Chats?:IeachChat[];
    count?:number;
    chatId?:string;
    InvitationId?:string
    totalChats?:number;
}
 const InvitationInsert = (state: IinvitationState, action: PayloadAction<IInviteAction>) => {
    let {payload}=action
    if (payload.Invitation!==undefined) state.Invitation=payload.Invitation
    if (payload.InvitationId!==undefined) state.InvitationId=payload.InvitationId
    if (payload.Chats!==undefined) state.Chats=payload.Chats
    if (payload.count!==undefined) state.count=payload.count
    if (payload.chatId!==undefined) state.chatId=payload.chatId
    if (payload.totalChats!==undefined) state.totalChats=payload.totalChats
  };

  export default InvitationInsert