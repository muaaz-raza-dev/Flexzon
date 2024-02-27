import { Iauth } from "@/app/Types/IAuth";
import { PayloadAction } from "@reduxjs/toolkit";
interface IinsertdataPayload {
    purpose:string,
    Name?:string,bio?:string,email?:string,avatar?:string,Topics?:string[],
       avatarBlob?:Blob;
       username?:string, password?:string;
}
export const InsertOperationAuth = (
  state: Iauth,
  {payload}: PayloadAction<IinsertdataPayload>
) => {
if (payload.purpose ==="login") {
    let {login}=state
   if (payload.username != undefined ) login.username =payload.username
   if(payload.password  != undefined ) login.password =payload.password
}
else{
    let {register}=state
    let {Name,email,avatar,Topics,bio,avatarBlob}=payload
    if (avatarBlob != undefined ) register.avatarBlob =avatarBlob
    if (payload.username != undefined ) register.username =payload.username
    if(payload.password  != undefined ) register.password =payload.password
    if (Name !==undefined) register.Name=Name
    if (email !==undefined) register.email=email
    if (avatar !==undefined) register.avatar=avatar
    if (Topics !==undefined) register.Topics=Topics
    if (bio !==undefined) register.bio=bio
}

  
}

export default InsertOperationAuth
