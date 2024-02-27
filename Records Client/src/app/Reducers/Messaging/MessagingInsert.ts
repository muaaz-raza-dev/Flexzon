


import { Ichats, Iinvites, Imessaging } from "@/app/Types/Imessaging";

import { PayloadAction } from "@reduxjs/toolkit/react";

interface ImessagingAction{
chats?:Ichats[],
Searched?:{username:string,avatar:string,_id:string}[],
SearchDialog?:{Open:boolean,purpose:"search"|"invitation"}
SelectedTab?:string,
Invites?:Iinvites[],
ConnectedUser?:string[]
}
const MessagingInsert = (state: Imessaging<any>, action: PayloadAction<ImessagingAction>) => {
    let {payload}=action
    if (payload.Searched!==undefined) {
       state.Searched=payload.Searched
  }
  if (payload.Invites!==undefined) {
    state.Invites=payload.Invites
}
  if (payload.SelectedTab!==undefined) {
    state.SelectedTab=payload.SelectedTab
}
  if (payload.SearchDialog!==undefined) {
    state.SearchDialog=payload.SearchDialog
}
if (payload.ConnectedUser!==undefined) {
  state.ConnectedUsers=payload.ConnectedUser
}
  if (payload.chats!==undefined) {
    let totalNewMsg=0
    payload.chats.forEach((elm)=>{
      totalNewMsg+=+elm.unread
    })
    state.newMessages=totalNewMsg
    state.chats=payload.chats
  }
  };


export default MessagingInsert
