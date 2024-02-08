import { LightLoader, SmallLoader } from '@/Essentials/Loader'
import ReadComments, { ReadCommentsFn } from '@/Queryfunctions/Comment/ReadComments'
import { useAppDispatch, useAppSelector } from '@/app/ReduxHooks'
import { CommentInsertion } from '@/app/Slices/CommentSlice'
import { AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Avatar } from '@radix-ui/react-avatar'
import { ChevronDown, } from 'lucide-react'
import { FC, useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import CommentsLike from './CommentsLike'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import CreditsValidator from '@/app/middlewares/functions/CreditsValidator'
import UploadComment from '@/Queryfunctions/Comment/UploadComment'
import moment from 'moment'


export const EachCommentBlock:FC<{data:Icomment,repliable?:boolean}> = ({data,repliable}) => {


  
return(
<div className='flex flex-col w-full p-2 border gap-y-2 '>
<div className="flex items-center py-2 border-b gap-x-2">
      <Avatar className="w-8 border rounded-full aspect-square ">
        <AvatarImage src={data.commentor.avatar||"/images/muaaz.png"} className="w-full rounded-full aspect-square"/>
      </Avatar>
      <div className="">
      <h1>{data.commentor.username||"Anonymous"}</h1>
      <p className='text-xs'>
       {moment(data.delivered).toNow()}
         </p>
      </div>
        </div>
        <main>
          <p className='text-sm'>
            {data.content}
          </p>
        </main>
        <footer className='flex justify-between w-full h-full'>
          {
            repliable!==false&&
          <RepliesCommentBlock data={data}/>
          }
        </footer>
</div>
)
}
export const RepliesCommentBlock:FC<{data:Icomment}> = ({data}) => {
  const [Replies, setReplies] = useState<boolean>(false);
  let {isLogined}=useAppSelector(state=>state.credits)
  return(
  <section className='flex flex-col w-full gap-y-3 '>
    <div className="flex justify-between">
<CommentsLike data={data}/>
<p className='text-sm text-right cursor-pointer' onClick={()=>setReplies(!Replies)}>{data.Replies.length} Replies</p>
    </div>
<div className="flex flex-col w-full px-2 pl-1 border gap-y-3">
{
isLogined&&  Replies&&
  <>
<PostReply data={data}/>
  {data.Replies.map(elm=><EachCommentBlock data={elm} repliable={false} /> )}
  </>
}
  </div>
  </section>)
}


const MainCommentBlock = () => {
  let Blogstate=useAppSelector(state=>state.Blog)
  let dispatch =useAppDispatch()
  let Commentstate=useAppSelector(state=>state.comment)
  let {mutate}=useMutation({ mutationFn:()=>ReadComments(Commentstate.count ,Blogstate.data?._id||""),mutationKey:Blogstate.data?._id||"",
  onSuccess(data) {
    let {payload}=data
    dispatch(CommentInsertion({count:payload.count,Comment:payload.Comment,totalResults:payload.totalResults}))
  }, } , )
  useEffect(() => {
    mutate()
  }, []);
  return (
    <main className='flex flex-col gap-y-4 '>
      <header className='flex items-center gap-x-2 '>Most Recent <ChevronDown size={20}/> </header>
      <Separator className='shadow-lg sha'/>
    
      <InfiniteScroll
      className="flex flex-col gap-y-4"
      height={500}
      dataLength={Commentstate.Comment.length}
     next={()=>{
      if (Commentstate.Comment.length!==0) {
        ReadCommentsFn<typeof dispatch >(Commentstate,dispatch,Blogstate.data?._id||"")}
      }
    }
      hasMore={Commentstate.Comment.length!==Commentstate.totalResults}
      loader={ 
<SmallLoader/>
      }
    
      >
{
  Commentstate.Comment.length!=0?
  Commentstate.Comment.map(comment=><EachCommentBlock data={comment}/>):
  <b className='text-center'>0 response</b>
}
</InfiniteScroll>


    </main>
  )
}


export const PostReply:FC<{data:Icomment}>=({data})=>{
  let credits=useAppSelector(state=>state.credits)
  let commentState =useAppSelector(state=>state.comment)
  let PostId=useAppSelector(state=>state.Blog)
  const [Comment, setComment] = useState("");
  let dispatch =useAppDispatch()
  let {mutate,isLoading} = useMutation({mutationKey:"Reply" ,mutationFn:()=>UploadComment(Comment,PostId.data?._id||"",data._id,true), onSuccess(output) {
    dispatch(CommentInsertion({Comment:commentState.Comment.map(elm=>{
      setComment("")
      if (elm._id!==data._id)return elm
      else return {...elm,Replies:[output.payload,...data.Replies] }
    })}))
  },}  )
return(

<div className="flex justify-between p-1 mt-4 gap-x-2 ">
  <Input placeholder='Reply' className='!text-black' onChange={(e)=>setComment(e.target.value)} value={Comment}/>
  <Button className="primary text-white hover:bg-[var(--primary)]" onClick={()=>{
      CreditsValidator(credits,mutate,dispatch)
    }}>
      {isLoading?<LightLoader/>:  "Post response"}
    </Button>
  </div>

)
}
export default MainCommentBlock
