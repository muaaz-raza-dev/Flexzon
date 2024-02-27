import ChatInsert from "@/app/Reducers/Messaging/EachChatReducer"
import { IchatsState } from "@/app/Types/Ichat"
import {createSlice} from "@reduxjs/toolkit"
export  const InitChatState :IchatsState = {
    Chats:[],
    chatId:"",
    totalChats:0,
    count:0,
    Invited:[],
    opponentOnline:false,
    Typing:false,
    user:{username:"",avatar:"",_id:"",LastLogin:""},
}
export const Post = createSlice({
    name:"Messaging State",
    initialState:InitChatState,
    reducers:{ChatInsertion:ChatInsert}
})
export const {ChatInsertion} = Post.actions
export const ChatState = Post.reducer
