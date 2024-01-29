
import {createSlice} from "@reduxjs/toolkit"
import { Iwrite } from "../Types/Iwrite";
import writeInsertion from "../Reducers/Write/WriteReducer";
export  const Write :Iwrite = {
    mainContent:localStorage.getItem("Blog_Content")||"",
    tags:[],
    title:"",
    subtitile:"",
    Banner:localStorage.getItem("Banner_Post")||"",
    timeToRead:"",
    topic:"",
    PostType:"",
    FollowerOnly:false,
    plainText:""
}
export const WriteSlice = createSlice({
    name:"Credentials",
    initialState:Write,
    reducers:{WriteInsertion:writeInsertion}
})
export const {WriteInsertion} = WriteSlice.actions
export const writeState = WriteSlice.reducer