import { Iinfo } from "@/app/Types/ICredits";
import { Iblog, } from "@/app/Types/Ilanding";
import {  IuserDetails } from "@/app/Types/IuserDetails";
import { PayloadAction } from "@reduxjs/toolkit/react";
interface IuserDAction{
    Info?: Iinfo;
    Follower?: Iinfo[];
    Following?: Iinfo[];
    Posts?: Iblog[];
    isAdmin?:boolean;
    selectedTab?:string
}

const userInsertion = (
  state: IuserDetails,
  action: PayloadAction<IuserDAction>
) => {
    let {payload}=action
    if (payload.Info !== undefined) state.Info = payload.Info;
    if (payload.Follower) state.Follower = payload.Follower;
    if (payload.Following) state.Following = payload.Following;
    if (payload.Posts) state.Posts = payload.Posts;
    if (payload.isAdmin) state.isAdmin = payload.isAdmin;
    if (payload.selectedTab) state.selectedTab = payload.selectedTab;

};

export default userInsertion;