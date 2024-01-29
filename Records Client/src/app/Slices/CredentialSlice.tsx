import {createSlice} from "@reduxjs/toolkit"
import { Icredits } from "../Types/ICredits";
import CreditsReducer from "../Reducers/Credentials/CreditsReducer";
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
    } ,
    isLogined:false,
}
export const CredentialsSlice = createSlice({
    name:"Credentials",
    initialState:Credits,
    reducers:{CreditsInsertion:CreditsReducer}
})
export const {CreditsInsertion} = CredentialsSlice.actions
export const Credentials = CredentialsSlice.reducer