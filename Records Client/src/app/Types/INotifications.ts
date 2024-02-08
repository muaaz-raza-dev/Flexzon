




export type Inotification={
    _id:string
    Reciever:string,//who recieve notification
    type:"likes"|"comments"|"follows",
    message:string,
    read:boolean,
    NotificationIncludedUser:{_id:string,avatar:string,username:string}, //who cause notification
    NotificationIncludedPost:string, //who cause notification
    notifiedTime:string
}

export interface InotificationState{
notifications:Inotification[]
}