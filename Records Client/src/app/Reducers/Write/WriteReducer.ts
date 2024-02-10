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
  plainText?: string;
  FollowerOnly?: boolean;
  AdditionalAssestsInclude?: boolean;
  AdditionalAssestsType?: "Question" | "Poll";
  AdditionalAssestsTitle?: string;
  correct?: string;
  Options?: { title: string }[];
  OptionIndex?: number;
  OptionRawIndexedTitle?: string;
  BannerBlob?:Blob,
  Commenting?:boolean
  likescount?:boolean

}

const writeInsertion = (state: Iwrite, action: PayloadAction<IwriteAction>) => {
  let { payload } = action;
  if (payload.Banner) state.Banner = payload.Banner;
  if (payload.title !== undefined) state.title = payload.title;
  if (payload.subtitile !== undefined) state.subtitile = payload.subtitile;
  if (payload.mainContent !== undefined)
    state.mainContent = payload.mainContent;
  if (payload.PostType !== undefined) state.PostType = payload.PostType;
  if (payload.topic !== undefined) state.topic = payload.topic;
  if (payload.timeToRead !== undefined) state.timeToRead = payload.timeToRead;
  if (payload.tags !== undefined) state.tags = payload.tags;
  if (payload.plainText !== undefined) state.plainText = payload.plainText;
  if (payload.FollowerOnly !== undefined)
    state.FollowerOnly = payload.FollowerOnly;
  if (payload.AdditionalAssestsInclude !== undefined)
    state.AdditionalAssests.include = payload.AdditionalAssestsInclude;
  if (payload.AdditionalAssestsType !== undefined)
    state.AdditionalAssests.PollnQ.type = payload.AdditionalAssestsType;
  if (
 state.AdditionalAssests.PollnQ.type == "Question"
  ) {
    if (payload.correct !== undefined) state.AdditionalAssests.PollnQ.correct = payload.correct;
  }
    if (payload.Options !== undefined) {
    state.AdditionalAssests.PollnQ.options = payload.Options;
  }
    
    if (payload.OptionIndex !== undefined) {
      state.AdditionalAssests.PollnQ.options[payload.OptionIndex].title = payload.OptionRawIndexedTitle||"";
    }
  if (payload.AdditionalAssestsTitle !== undefined) {
    state.AdditionalAssests.PollnQ.title = payload.AdditionalAssestsTitle;
  }
  if (payload.BannerBlob!==undefined) { 
    state.BannerBlob=payload.BannerBlob}
    if (payload.Commenting!==undefined) { 
      state.Commenting=payload.Commenting}
      if (payload.likescount!==undefined) { 
        state.likescount=payload.likescount}
};

export default writeInsertion;
