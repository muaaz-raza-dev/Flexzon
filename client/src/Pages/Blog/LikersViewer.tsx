import { useAppSelector } from '@/app/ReduxHooks'
import { FollowerandFollowingDialog } from '../Profile/User Info/FollowerandFollowingDialog'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import useGetLikers from './useGetLikers'

const LikersViewer = () => {
    let blog = useAppSelector(state=>state.Blog.data)
    let {data} =useGetLikers()
  return (
    <FollowerandFollowingDialog data={data||[]} >
    <div className="items-center gap-x-1 text-[.95rem] flex" >
      <div className="flex gap-x-1 items-center">
        <Avatar className="w-6 h-6 object-contain aspect-square"><AvatarImage src={blog?.likedDetails&& blog?.likedDetails[0].avatar} className=""/></Avatar>
        {blog?.likedDetails&&blog?.likedDetails[0]?.username} {" "}
        </div> 
        {
          (blog?.likes||1)!==1&&
        <p>
         and {(blog?.likes||1)-1} others 
        </p> 
        }
        liked
    </div>

   </FollowerandFollowingDialog>
  )
}

export default LikersViewer
