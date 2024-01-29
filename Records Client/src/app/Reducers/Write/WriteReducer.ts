import { Iwrite } from "@/app/Types/Iwrite";
import { PayloadAction } from "@reduxjs/toolkit/react";
interface IwriteAction {
  Banner?: string;
  title?: string;
  subtitile?: string;
  mainContent?: string;
  PostType?: string;
  topic?: string;
  timeToRead?: string;
  tags?: string[];
  plainText?:string
  FollowerOnly?:boolean
}

const writeInsertion = (state: Iwrite, action: PayloadAction<IwriteAction>) => {
  let { payload } = action;
  if (payload.Banner) state.Banner = payload.Banner;
  if (payload.title      !==undefined) state.title = payload.title;
  if (payload.subtitile  !==undefined) state.subtitile = payload.subtitile;
  if (payload.mainContent !==undefined) state.mainContent = payload.mainContent;
  if (payload.PostType !==undefined) state.PostType = payload.PostType;
  if (payload.topic !==undefined) state.topic = payload.topic;
  if (payload.timeToRead !==undefined) state.timeToRead = payload.timeToRead;
  if (payload.tags !==undefined) state.tags = payload.tags;
  if (payload.plainText !==undefined) state.plainText = payload.plainText;
  if (payload.FollowerOnly !==undefined) state.FollowerOnly = payload.FollowerOnly;
  
};

export default writeInsertion;
