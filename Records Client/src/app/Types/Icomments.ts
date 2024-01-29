
interface Icomment{
    commentor:{
        username:string;
        avatar:string;
        PublishedDate:string;
    }
    _id:string;
    content:string;
    likes:string[];
    delivered:string;
    Replies:Icomment[]
}

interface IcommentState{
    Comment :Icomment[];
    count:number;
    totalResults:number
}