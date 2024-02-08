import Axios from "../axios"
import { insertion } from "@/app/Slices/LandingSlice"
import { Icredits } from "@/app/Types/ICredits"
import { Ilanding } from "@/app/Types/Ilanding"
    let FetchBlogs=async<T>(data:Ilanding,dispatch:T,Credits?:Icredits)=>{
        let interests=Credits?.Info.interests
        let response = await Axios.post(`/posts`,{count:data.count,interests:interests?.map(elm=>elm._id)||[] ,topic: data.selectedTabs=="For you"?"":data.selectedTabs})
        if (typeof dispatch ==="function") {
            dispatch(insertion({count:data?.count+1,Blogs:[...data?.Blogs,...response.data?.payload],totalResults:+response.data.TotalResults||0}))
        }
    }
export default FetchBlogs