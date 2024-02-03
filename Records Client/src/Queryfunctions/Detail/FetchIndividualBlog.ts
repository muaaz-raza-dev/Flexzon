import { Iblog } from "@/app/Types/Ilanding";
import Axios from "../axios";
export interface Iapi<T>{
    success:boolean;
    payload:T
}
interface IindividualBlogOutcome {
    Post: Iblog;
  Recommendations?: Iblog[];
}
const FetchIndividualBlog = async (id: string,AdminId?:string) => {
  let response = await Axios.get<Iapi<IindividualBlogOutcome> >(`/posts/post/${id}`,{headers:{"AdminId":AdminId}});
  
  return response.data;
};

export default FetchIndividualBlog;
