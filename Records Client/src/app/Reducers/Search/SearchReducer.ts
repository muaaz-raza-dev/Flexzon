import { Iblog, Itopic } from "@/app/Types/Ilanding";
import { Imember, Isearch } from "@/app/Types/Isearch";
import { PayloadAction } from "@reduxjs/toolkit/react";
interface IsearchAction{
    input?:string;
    blogResults?:Iblog[];
    users?:Imember[];
    topics?:Itopic[]
}

const SearchInsertion = (
  state: Isearch,
  action: PayloadAction<IsearchAction>
) => {
    let {payload}=action
if (payload.input !==undefined) {
    state.input=payload.input
    
}
if (payload.blogResults) {
 state.blogResults=payload.blogResults
}
    if (payload.users) {
        state.users=payload.users
       }
       if (payload.topics)  state.topics=payload.topics


};

export default SearchInsertion;
