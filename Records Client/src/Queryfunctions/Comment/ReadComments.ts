import { CommentInsertion } from "@/app/Slices/CommentSlice";
import Axios from "../axios";

export interface Iapi<T>{
    success:boolean;
    payload:T
}

const ReadComments = async(count:number=0,postId:string) => {
      let response = await Axios.post<Iapi<IcommentState> >(`/comments/read/${postId}`,{},{headers:{"count":count}});
      
      return response.data;
    
    
}


export const ReadCommentsFn = async<T>(data:IcommentState,dispatch:T,postId:string) => {
    let response = await Axios.post<Iapi<IcommentState>>(`/comments/read/${postId}`,{},{headers:{"count":data.count}})
    let payload = response.data.payload
    if (typeof dispatch =="function") {
        dispatch(CommentInsertion({count:payload.count,Comment:[...data.Comment, ...payload.Comment],totalResults:payload.totalResults}))
    }
  
  
}

export default ReadComments
