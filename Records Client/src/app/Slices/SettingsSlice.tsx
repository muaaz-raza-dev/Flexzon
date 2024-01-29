import {createSlice} from "@reduxjs/toolkit"
import { Isetting } from "../Types/Isettings";
import SettingsInsertion from "../Reducers/Setting/SettingReducer";
export  const settingState :Isetting = {
    tabs:[
        {name:"Personal Information",route:"/"}
        ,{name:"Notification", route:"/notification"},{name:"Education/Skills",route:"/education"}
    ],
    selectedTab:{name:"Personal Information",route:"/"}
}
export const SettingSlice = createSlice({
    name:"Search",
    initialState:settingState,
    reducers:{
        SettingInsert:SettingsInsertion
    }
})
export const {SettingInsert} = SettingSlice.actions
export const SettingR = SettingSlice.reducer