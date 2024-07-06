interface IPollingnQ {
  include: boolean;
  available:["Poll","Question"]
  PollnQ:
     { type: "Poll"; title: string; options: { title: string }[] }
    | { type: "Question"; title: string; options: { title: string }[] ,correct:string };
}

export interface Iwrite {
  Banner: string;
  BannerBlob?:Blob
  title: string;
  subtitile: string;
  mainContent: string;
  PostType: string;
  topic: string;
  FollowerOnly: boolean;
  timeToRead: string;
  plainText: string;
  tags: string[];
  AdditionalAssests: IPollingnQ;
  Commenting:boolean;
  likescount:boolean;
}
