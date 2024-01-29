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


export const Store = configureStore({
    reducer:{landing:LandingReducer,credits:Credentials,auth:authState,search:SearchR ,
    userDetails:userDetailsR,write:writeState,
    searched:SearchedReducer,
    comment:CommentSliced,
    Blog:BlogState,
    settings:SettingR
    }
});

export type RootState = ReturnType <typeof Store.getState>
export type AppDispatch = typeof Store.dispatch
