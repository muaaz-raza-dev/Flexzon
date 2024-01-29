import { Avatar } from "@/components/ui/avatar"
import { AvatarImage } from "@radix-ui/react-avatar"

const EachNotification = ()=>{
    return(
    <section className="w-full flex gap-x-2 items-center border p-2 rounded">
    <Avatar>
        <AvatarImage src="/images/muaaz.png"/>
    </Avatar>
    <p className="text-md">Muaaz and 16 others liked your blog
    and commented "hey muaaz, what's up bro! lorem "</p>
    </section>
    )
}


const Notifications = () => {
  return (
    <div className='w-full h-full overflow-auto p-2 mb-4 flex flex-col gap-y-6'>
      {
        Array(30).fill("435").map(()=><EachNotification/>)
      }
{/* <p className="px-3 text-sm">You're all caught up.</p> */}
    </div>
  )
}

export default Notifications
