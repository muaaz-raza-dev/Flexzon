
import {createSlice} from "@reduxjs/toolkit"
import { InotificationState } from "@/app/Types/INotifications";
import NotificationInsertion from "@/app/Reducers/Notification/NotificationReducer";
export  const Notifications :InotificationState = {
   notifications:[]
}
export const NotificationSlice = createSlice({
    name:"Notifications",
    initialState:Notifications,
    reducers:{NotificationInsert:NotificationInsertion}
})
export const {NotificationInsert} = NotificationSlice.actions
export const NotificationState = NotificationSlice.reducer