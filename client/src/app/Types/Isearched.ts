import { Iblog } from "./Ilanding";
export interface ItopicInfo{
    title:string;
    _id:string;
    Followers:number;
    totalPosts:number
}
export interface Isearched{
    Blogs:Iblog[],
    count:number,
    totalResults:number,
    Topic:ItopicInfo,
    TopicSearch:boolean

}