import {createSlice} from "@reduxjs/toolkit"
import { Icredits } from "../Types/ICredits";
import CreditsReducer from "../Reducers/Credentials/CreditsReducer";
import Cookies from "js-cookie";
export  const Credits :Icredits = {
  Info:{
        _id:"",
      username:"",
      avatar:"",
      email:"",
      Name:"",
      bio:"",
      followers:[],
      following:[],
      Posts:[],
      saved:[],
      anonymous:[],
      liked:[],
      interests:[],
      registeredDate:"",
    notificationSettings:{all:true,follow:true,Comment:true,Post:true,Like:true}
    } ,
    isLogined:false,
    isLoading:true,
    OTPRequest:Cookies.get("ROR")?true:false
}
export const CredentialsSlice = createSlice({
    name:"Credentials",
    initialState:Credits,
    reducers:{CreditsInsertion:CreditsReducer}
})
export const {CreditsInsertion} = CredentialsSlice.actions
export const Credentials = CredentialsSlice.reducer