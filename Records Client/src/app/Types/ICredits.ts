import { Iblog, Itopic } from "./Ilanding";


export interface Iinfo{
    _id:string;
    username:string
    avatar:string,
    email:string,
    Name:string,
    bio:string,
    followers:Iinfo[],
    following:Iinfo[],
    Posts:Iblog[],
    saved:Iblog[],
    anonymous:Iblog[],
    interests:Itopic[],
    liked:string[],
    registeredDate:string;
    dob? :{value:string,display:boolean}, 
    website?:{url:string,altText:string},
    Links?:{fb:string,insta:string,linkedIn:string},
    gender?:{value:string,display:boolean},
}
export interface Icredits {
    Info:Iinfo
    isLogined:boolean;
}