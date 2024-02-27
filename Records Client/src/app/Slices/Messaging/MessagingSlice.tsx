import MessagingInsert from "@/app/Reducers/Messaging/MessagingInsert"
import { Imessaging } from "@/app/Types/Imessaging"
import {createSlice} from "@reduxjs/toolkit"
import {  io } from "socket.io-client"
export let socket = io(import.meta.env.VITE_APP_URL)

export  const MessagingsState :Imessaging<typeof socket> = {
    "Searched":[],
    "chats":[],
    socket,
    ConnectedUsers:["me"],
    newMessages:0,
    SelectedTab:"Chats",
    Invites:[],
    Tabs:["Chats","Invites"],
    SearchDialog:{Open:false,purpose:"search"}
}
export const Post = createSlice({
    name:"Messaging State",
    initialState:MessagingsState,
    reducers:{MessagingInsertion:MessagingInsert}
})
export const {MessagingInsertion} = Post.actions
export const MessagingState = Post.reducer