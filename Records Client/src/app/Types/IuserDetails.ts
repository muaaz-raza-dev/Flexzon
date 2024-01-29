import { Iinfo } from "./ICredits";
import { Iblog } from "./Ilanding";

export interface Iuser{
    username:string; avatar:string; bio?:string;
    _id:string

}
export interface IuserDetails{
Info:Iinfo
Follower:Iinfo[]
Following:Iinfo[]
Posts:Iblog[],
isAdmin:boolean,
tabs:string[],
selectedTab:string
}