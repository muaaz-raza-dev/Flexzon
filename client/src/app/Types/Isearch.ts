import { Iblog } from "./Ilanding";

export interface Imember{
    username:string,
    avatar:string,
    email:string,
    Name:string,
    bio:string,
    followers:Imember[],
    following:Imember[],
    Posts:Iblog[],
    saved:Iblog[],
    interests:string[],
    registeredDate:string,
    _id:string
}
interface Itopic{
    _id:string;
    title:string
}
export interface Isearch{
    input:string;
    blogResults:Iblog[];
    users:Imember[];
    topics:Itopic[]
}