import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
// import { Profile } from "../ProfileFile"
import { FC } from "react"
import { Link } from "react-router-dom"
import { useAppSelector } from "@/app/ReduxHooks"
import FollowPattren from "./FollowPattren"
import ProfileDetails from "./ProfileDetails"
import { FollowerandFollowingDialog } from "./FollowerandFollowingDialog"

const PuserInfoFile:FC = () => {
  let userState = useAppSelector(state=>state.userDetails)
  let credits = useAppSelector(state=>state.credits)
  return (
    <section className="md:w-[85%] max-md:w-[92%] flex flex-col items-center justify-center mt-8 gap-y-8">
        <section className="lg:w-[75%] max-lg:w-[85%] max-md:w-[95%] max-sm:w-[100%] flex justify-between max-md:flex-col items-center gap-y-4 ">
<div className="w-1/2 flex justify-center ">
<div className=" w-48 aspect-square rounded-full bg-gray-400">
<img src={userState.Info.avatar||"/images/muaaz.png"} alt="profile picture" className="w-full aspect-square rounded-full object-cover" />
</div>
</div>

      <div className="md:w-1/2 max-md:w-[85%] flex flex-col max-md:items-center gap-y-2">
        
        <div className="flex  items-center gap-x-4">
<h1 className="font-bold text-2xl">{userState.Info.username}</h1>
<Button className="bg-transparent hover:bg-[var(--primary)] border border-[black] hover:text-white text-black font-bold" variant={"outline"}>
  {userState.Info._id===credits.Info._id?
  <Link to={"/profile/settings"}>
  Edit profile
  </Link>:
  <FollowPattren/>
  }
  </Button>
<ProfileDetails/>
        </div>
        <div className="flex max-md:w-[95%] md:w-[80%] gap-5">
    <b className="">{userState.Posts.length} blogs   </b>
    <FollowerandFollowingDialog data={userState.Follower} >
    <b className="hover:underline transition-all underline-offset-1">{userState.Follower.length} Follower{userState.Follower.length>1&&"s"}</b>
    </FollowerandFollowingDialog>
    <FollowerandFollowingDialog data={userState.Following}>
    <b className="hover:underline transition-all underline-offset-1">{userState.Following.length} Following</b>
    </FollowerandFollowingDialog>
</div>
<p className="text-gray-500">
{userState.Info?.bio}
</p>
      </div>
        </section>
        <Separator/>
    </section>
  )
}

export default PuserInfoFile
