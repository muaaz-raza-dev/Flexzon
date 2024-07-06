import {createSlice} from "@reduxjs/toolkit"
import CommentReducer from "../Reducers/Comment/CommentReducer";
export  const CommentState :IcommentState = {
Comment:[],
count:0,
totalResults:0
}
export const CommentSlice = createSlice({
    name:"Comment",
    initialState:CommentState,
    reducers:{CommentInsertion:CommentReducer}
})
export const {CommentInsertion} = CommentSlice.actions
export const CommentSliced = CommentSlice.reducer



export default CommentSlice
