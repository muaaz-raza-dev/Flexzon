import { InsertData } from "../Reducers/Landing/LandingReducer";
import { Ilanding } from "../Types/Ilanding";
import {createSlice} from "@reduxjs/toolkit"
export  const LandingState :Ilanding = {
Blogs:[],
Trendings:[],
Topics:[],
TopCreators:[],
Creators:{docs:[],total:0},
count:0,
tabs:[{title:"For you",_id:"all"}],
selectedTabs:"For you",
totalResults:10,
ValidModal:false
}
export const LandingSlice = createSlice({
    name:"LandingState",
    initialState:LandingState,
    reducers:{insertion:InsertData}
})
export const {insertion} = LandingSlice.actions
export const LandingReducer = LandingSlice.reducer