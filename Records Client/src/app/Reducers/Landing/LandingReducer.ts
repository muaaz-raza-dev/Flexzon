import { Iblog, Ilanding, Itopic } from "@/app/Types/Ilanding";
import { PayloadAction } from "@reduxjs/toolkit";
interface IinsertdataPayload {
  Blogs?: Iblog[];
  Topics?: {_id:string,  topic:{_id:string,title:string},result:number}[];
  Trendings?: Iblog[];
  count?: number;
  tabs?: Itopic[];
  selectedTabs?: string;
  totalResults?:number;
  ValidModal?:boolean
}
export const InsertData = (
  state: Ilanding,
  action: PayloadAction<IinsertdataPayload>
) => {
  if (action.payload.Blogs) {
    state.Blogs = action.payload.Blogs;
  }
  if (action.payload.Topics) {
    state.Topics = action.payload.Topics;
  }
  if (action.payload.Trendings) {
    state.Trendings = action.payload.Trendings;
  }
  if (action.payload.count) {
    state.count = action.payload.count;
  }
  if (action.payload.tabs) {
    state.tabs = [state.tabs[0],...action.payload.tabs];
  }
  if (action.payload.selectedTabs) {
    state.selectedTabs = action.payload.selectedTabs;
  }
  if (action.payload.totalResults) {
    state.totalResults = action.payload.totalResults;
  }
  if (action.payload.ValidModal!==undefined) {
    
    state.ValidModal = action.payload.ValidModal;
  }
};
