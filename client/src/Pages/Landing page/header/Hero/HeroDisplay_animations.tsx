import { BorderBeam } from "@/components/magicui/border-beam"
import {MessageCircle, MonitorSmartphone, PenLine } from "lucide-react"

const HeroDisplay_animations = () => {
  return (
    <div className="  max-lg:hidden  overflow-visible flex items-center gap-4  justify-center ">
  <div className="w-[30%] rounded flex flex-col g px-6  heroCardsBg py-8 relative h-32">
    <BorderBeam size={300}/>
    <div className="flex gap-x-2 items-center">
    <PenLine size={20} />
    <h1 className="font-bold text-xl">Efficient Content Creation: </h1>
    </div>
    <p className=""> Streamline your writing process with intuitive tools and automations.</p>
  </div>

  <div className="w-[30%] rounded flex flex-col  px-6  heroCardsBg py-8 relative h-32">
  <BorderBeam size={300}/>
<div className="flex gap-x-2 items-center">
  <MessageCircle size={20}/>
  
    <h1 className="font-bold text-xl">
    Interactive Engagement
    </h1>
    </div>
    <p className="">Foster community with built-in commenting and sharing features.</p>
  </div>

  <div className="w-[30%] rounded flex flex-col  px-6  heroCardsBg py-8 relative h-32">
  <BorderBeam size={300}/>

  <div className="flex gap-x-2 items-center">

  <MonitorSmartphone size={20} />
    <h1 className="font-bold text-xl">24 hour active service</h1>
    </div>
    <p className=""> Easily organize and edit your posts with our user-friendly interface.</p>
  </div>
  

    </div>
  )
}

export default HeroDisplay_animations