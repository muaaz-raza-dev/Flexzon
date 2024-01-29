import Axios from "../axios";
const SearchTopicFn = async(topic:string,count:number) => {
        let response = await Axios.get(`/posts/topic/${topic}`,{
            headers:{"count":count}
        });
        return response.data;
}

export const SearchFn = async(q:string,count:number) => {
    
    let response = await Axios.get(`/posts/search`,{
        headers:{"count":count,"q":q}
    });
    return response.data;
}

export default SearchTopicFn
