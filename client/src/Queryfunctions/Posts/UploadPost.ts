import Cookies from "js-cookie";
import Axios from "../axios";
interface BlogPost{
    author:string,title:string,subTitle:string,banner:string,content:string,timeToRead:string,topic:string,tags?:string,anonymous:boolean;FollowerOnly:boolean;AdditonalAssetsType?:"Poll"|"Question";
    AdditonalAssets?:{title:string,options:{title:string,}[],correct?:string}
,commenting:boolean,
likesCount:boolean
}
const UploadFn = async({author,title,subTitle,banner,content,timeToRead,topic,tags,anonymous,FollowerOnly,AdditonalAssets,AdditonalAssetsType,commenting,likesCount}:BlogPost) => {
        let response = await Axios.post(`/posts/upload`,
        {author,title,subTitle,banner,content,timeToRead,topic,tags,anonymous,FollowerOnly,AdditonalAssets,AdditonalAssetsType,commenting,likesCount},
        {headers:{"auth-token":Cookies.get("Records_session")}});
        return response.data;
}

export default UploadFn
