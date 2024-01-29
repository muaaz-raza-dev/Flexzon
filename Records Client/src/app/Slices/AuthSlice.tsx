
import {createSlice} from "@reduxjs/toolkit"
import { Iauth } from "../Types/IAuth";
import InsertOperationAuth from "../Reducers/auth/AuthReducer";
export  const Credits :Iauth = {
   login:{username:"",password:""},
   register:{
       Name:"",bio:"",email:"",avatar:"",Topics:[],username:"",password:""
}
}
export const AuthSlice = createSlice({
    name:"Credentials",
    initialState:Credits,
    reducers:{AuthInsertion:InsertOperationAuth}
})
export const {AuthInsertion} = AuthSlice.actions
export const authState = AuthSlice.reducer