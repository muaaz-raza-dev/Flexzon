import { PayloadAction } from "@reduxjs/toolkit"
interface IcommentAction {
    Comment?:Icomment[]
    count?:number;
    totalResults?:number
}
const CommentReducer = (state:IcommentState,action:PayloadAction<IcommentAction>) => {
    let {payload} =action
if (payload.Comment !==undefined) {
    state.Comment  =payload.Comment
}
if(payload.count !==undefined){
    state.count  =payload.count
}
if(payload.totalResults !==undefined){
    state.totalResults  =payload.totalResults
}
}

export default CommentReducer
