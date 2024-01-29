import { useAppDispatch, useAppSelector } from "@/app/ReduxHooks";
import Axios from "../axios";
import { insertion } from "@/app/Slices/LandingSlice";
import {  Itopic } from "@/app/Types/Ilanding";

const useFetchStarter = async () => {
    
  let data = useAppSelector((state) => state.landing);

  let dispatch = useAppDispatch();
  if (data.Blogs.length===0&&data.selectedTabs==="For you") {
    
      let response = await Axios.post(`/posts/starter`, {count: data.count, interests:data.Topics||[] });
      dispatch(
          insertion({
              count: data.count + 1,
              Blogs:[ ...data.Blogs, ...response.data?.payload?.Blogs],
              Topics:response.data?.payload?.Topics,
      Trendings: response.data?.payload?.Trendings,
    })
    );

}


};

export let FetchStarter  = async(count:number,Topics:Itopic[])=>{
  let response = await Axios.post(`/posts/starter`, {count: count, interests:Topics.map(elm=>elm.title)||[] });
  return response.data
}

export default useFetchStarter;
