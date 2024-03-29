import { Icredits, Iinfo } from "@/app/Types/ICredits";
import { Iblog, Itopic } from "@/app/Types/Ilanding";
import { PayloadAction } from "@reduxjs/toolkit/react";
interface IpaylaodCredits {
    Info?:Iinfo,
    isLogined?:boolean;
    Posts?:Iblog[];    
    liked?:string[];
    saved?:Iblog[];
    followers?:Iinfo[]
    following?:Iinfo[]
    username?:string
    avatar?:string,
    email?:string,
    Name?:string,
    bio?:string,
    interests?:Itopic[],
    isLoading?:boolean;
    OTPRequest?:boolean;
    NotificationSetting?:{all:boolean,follow:boolean,Comment:boolean,Post:boolean,Like:boolean}
}
const CreditsReducer = (
  state: Icredits,
  action: PayloadAction<IpaylaodCredits>
) => {
    let {payload}=action
if (payload.isLogined!==undefined) {
    state.isLogined=payload.isLogined
}
if (payload.    OTPRequest!==undefined) {
    state.    OTPRequest=payload.OTPRequest
}
if (payload.isLoading!==undefined) {
    state.isLoading=payload.isLoading
}
if (payload.interests!==undefined) {
    state.Info.interests=payload.interests
}
if (payload.Info!==undefined) {
    state.Info=payload.Info
}
if (payload.liked!==undefined) {
    state.Info.liked=payload.liked
}
if (payload.saved!==undefined) {
    state.Info.saved=payload.saved
}
if (payload.followers!==undefined) {
    state.Info.followers=payload.followers
}
if (payload.following!==undefined) {
    state.Info.following=payload.following
}
if (payload.Info?.Posts!==undefined) {
    state.Info.Posts=payload.Info.Posts
}

if (payload.Name!==undefined) {
    state.Info.Name=payload.Name
}if (payload.username!==undefined) {
    state.Info.username=payload.username
}if (payload.email!==undefined) {
    state.Info.email=payload.email
}if (payload.bio!==undefined) {
    state.Info.bio=payload.bio
}
if (payload.avatar!==undefined) {
    state.Info.avatar=payload.avatar
}
if (payload.NotificationSetting) {
    state.Info.notificationSettings=payload.NotificationSetting
}
};

export default CreditsReducer;
