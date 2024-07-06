
import {createSlice} from "@reduxjs/toolkit"
import { Isearch } from "../Types/Isearch";
import SearchInsertion from "../Reducers/Search/SearchReducer";
export  const searchState :Isearch = {
    input:"",
    users:[],
    blogResults:[],
    topics:[]
}
export const SearchSlice = createSlice({
    name:"Search",
    initialState:searchState,
    reducers:{
        SearchInsert:SearchInsertion
    }
})
export const {SearchInsert} = SearchSlice.actions
export const SearchR = SearchSlice.reducer