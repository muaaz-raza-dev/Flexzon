import { configureStore } from "@reduxjs/toolkit";
import { LandingReducer } from "./Slices/LandingSlice";
import { Credentials } from "./Slices/CredentialSlice";
import { authState } from "./Slices/AuthSlice";
import { SearchR } from "./Slices/SearchSlice";
import { userDetailsR } from "./Slices/UserDetailsSilce";
import { writeState } from "./Slices/WriteSlice";
import { SearchedReducer } from "./Slices/SearchedSlice";
import { CommentSliced } from "./Slices/CommentSlice";
import { BlogState } from "./Slices/BlogSlice";
import { SettingR } from "./Slices/SettingsSlice";
import { NotificationState } from "./Slices/Notifications/NotifcationSlice";
import { MessagingState } from "./Slices/Messaging/MessagingSlice";
import { ChatState } from "./Slices/Messaging/EachChatSlice";
import { invitationState } from "./Slices/InvitationSlice";


export const Store = configureStore({
    reducer:{landing:LandingReducer,credits:Credentials,auth:authState,search:SearchR ,
    userDetails:userDetailsR,write:writeState,
    searched:SearchedReducer,
    comment:CommentSliced,
    Blog:BlogState,
    settings:SettingR,
    notifications:NotificationState,
    messaging:MessagingState,
    chat:ChatState,
    Invitation:invitationState
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false}),
});

export type RootState = ReturnType <typeof Store.getState>
export type AppDispatch = typeof Store.dispatch
