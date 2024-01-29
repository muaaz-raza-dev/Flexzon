import {IStab, Isetting} from "@/app/Types/Isettings";
import { PayloadAction } from "@reduxjs/toolkit/react";
interface IsearchAction{
    tabs?:IStab[]
    selectedTab?:IStab
}

const SettingsInsertion = (
  state: Isetting,
  action: PayloadAction<IsearchAction>
) => {
    let {payload}=action
if (payload.tabs)state.tabs=payload.tabs
if (payload.selectedTab)  state.selectedTab=payload.selectedTab


};

export default SettingsInsertion;
