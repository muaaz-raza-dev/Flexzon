import {createSlice} from "@reduxjs/toolkit"
import { IinvitationState } from "../Types/IInvitation";
import InvitationInsert from "../Reducers/Messaging/InvitationInsert";
export  const InvitationState :IinvitationState = {
    Invitation:{ ChatId: {
        Chatters: [],
        _id: ""
    },
    InvitedBy: {
        username: "",
        avatar: "",
        _id: "",
        Active:""
    },
    InvitedAt: "",
    _id: ""},
Chats:[],
chatId:"",
totalChats:0,
count:0,
InvitationId:'', //Invitation Id
}
export const InvitationSlice = createSlice({
    name:"Invitation",
    initialState:InvitationState,
    reducers:{InvitationStateInsertion:InvitationInsert}
})
export const {InvitationStateInsertion} = InvitationSlice.actions
export const invitationState = InvitationSlice.reducer



export default InvitationSlice
