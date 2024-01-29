import {createSlice} from "@reduxjs/toolkit"
import { Isearched } from "../Types/Isearched";
import searchedInsertion from "../Reducers/SearchedReducer";
export  const SearchedState :Isearched = {
Blogs:[],
count:0,
totalResults:0,
TopicSearch:false,
Topic:{_id:"",title:"",Followers:0,totalPosts:0}
}
export const SearchedSlice = createSlice({
    name:"SearchedState",
    initialState:SearchedState,
    reducers:{SearchedInsert:searchedInsertion}
})
export const {SearchedInsert} = SearchedSlice.actions
export const SearchedReducer = SearchedSlice.reducer