
import Axios from "../axios"

const FetchBlogs = async(count:number,interests:string[]) => {

let response = await Axios.post(`/posts`,{count,insterests:interests||[]})
return response

}

export const FetchStarter = async(count:number) => {


let interests=null
    let response = await Axios.post(`/posts/starter`,{count,interests})
    return response.data

    }
export default FetchBlogs
