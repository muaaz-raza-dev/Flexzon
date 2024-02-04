import { IblogFile } from "@/app/Types/IblogFile";
import { IPoll, IQuestion, Iblog } from "@/app/Types/Ilanding";
import { PayloadAction } from "@reduxjs/toolkit/react";
interface IblogAction {
data?:Iblog;
Polled?:boolean;
PolledTotal?:number;
Recommendations?:Iblog[]
Poll?:IPoll;
Question?:IQuestion
QuestionVoted?:string
}

const BlogInsertion = (state: IblogFile, action: PayloadAction<IblogAction>) => {
  let { payload } = action;
  if (payload.data){ state.data = payload.data;
  }
  if (payload.Recommendations) state.Recommendations = payload.Recommendations;
  if (state.data&&payload.PolledTotal&& state.data.Poll ){ state.data.Poll.total = payload.PolledTotal;}
  if (payload.Poll&&state.data?.Poll) state.data.Poll = payload.Poll;
  if (payload.Question&&state.data?.Question) state.data.Question = payload.Question;
  if (payload.QuestionVoted&&state.data?.Question?.voted) state.data.Question.voted = payload.QuestionVoted;

};

export default BlogInsertion;