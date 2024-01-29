import { IblogFile } from "@/app/Types/IblogFile";
import { Iblog } from "@/app/Types/Ilanding";
import { PayloadAction } from "@reduxjs/toolkit/react";
interface IblogAction {
data?:Iblog;
Recommendations?:Iblog[]
}

const BlogInsertion = (state: IblogFile, action: PayloadAction<IblogAction>) => {
  let { payload } = action;

  if (payload.data) state.data = payload.data;
  if (payload.Recommendations) state.Recommendations = payload.Recommendations;

};

export default BlogInsertion;