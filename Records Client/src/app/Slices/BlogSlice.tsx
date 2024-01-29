
import {createSlice} from "@reduxjs/toolkit"
import { IblogFile } from "../Types/IblogFile";
import BlogInsertion from "../Reducers/EachBlog/BlogReducer";
export  const PostState :IblogFile = {
Recommendations:[]
}
export const Post = createSlice({
    name:"Detailed Blog",
    initialState:PostState,
    reducers:{BlogInsert:BlogInsertion}
})
export const {BlogInsert} = Post.actions
export const BlogState = Post.reducer