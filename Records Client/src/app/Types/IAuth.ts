export interface Ilogin{
     username:string, password:string
}
export interface Iregister extends Ilogin {
   Name:string,bio:string,email:string,avatar?:string,Topics:string[]
}
export interface Iauth{
    register:Iregister;
    login:Ilogin
}