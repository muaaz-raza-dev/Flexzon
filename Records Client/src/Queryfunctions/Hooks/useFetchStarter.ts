import { useAppDispatch, useAppSelector } from "@/app/ReduxHooks";
import Axios from "../axios";
import { insertion } from "@/app/Slices/LandingSlice";
import { useMutation } from "react-query";

const useFetchStarter = () => {
  let state = useAppSelector((state) => state.landing);
  let Info = useAppSelector((state) => state.credits);
  let dispatch = useAppDispatch();
  return  useMutation({
    mutationKey: "Topics",
    onSuccess(data) {
      dispatch(
        insertion({
          count: state?.count + 1,
          Blogs: [...state.Blogs, ...data?.payload?.Blogs] || [],
          Topics: data?.payload?.Topics || [],
          tabs: data?.payload?.Topics.map((e:any)=>e.topic),
          Trendings: data?.payload?.Trendings || [],
          TopCreators: data?.payload.TopCreators || [],
          Creators:data.payload?.Creators
        })
      );
    },
    mutationFn: () => FetchStarter(state.count, Info.Info.interests),
  });



};

export let FetchStarter  = async(count:number,Topics:any)=>{
  let response = await Axios.post(`/posts/starter`, {count: count, interests:Topics.map((elm:any)=>elm.title)||[] });
  return response.data
}



export default useFetchStarter;
