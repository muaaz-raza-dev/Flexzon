import {createSlice} from "@reduxjs/toolkit"
import { IuserDetails } from "../Types/IuserDetails";
import userInsertion from "../Reducers/userDetails/userDetailsReducer";
export  const userDetailsState :IuserDetails = {
    Info:{    _id:"",
    username:"",
    avatar:"",
    email:"",
    Name:"",
    bio:"",
    followers:[],
    following:[],
    Posts:[],
    anonymous:[],
    saved:[],
    liked:[],
    interests:[],
    registeredDate:""},
    Follower:[],
    Following:[],
    Posts:[],
    isAdmin:false,
    tabs:["Posts","Saved","Anonymous"],
    selectedTab:"Posts"
}
export const userDetails = createSlice({
    name:"UserDetails",
    initialState:userDetailsState,
    reducers:{
        userDetailsInsertion:userInsertion
    }
})
export const {userDetailsInsertion} = userDetails.actions
export const userDetailsR = userDetails.reducer