
export type IStab = {
    name:string;
    route:string;
}
export interface Isetting{
    tabs:IStab[]
    selectedTab:IStab
}