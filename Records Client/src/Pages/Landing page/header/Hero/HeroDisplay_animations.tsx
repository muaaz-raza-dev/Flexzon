import { BorderBeam } from "@/components/magicui/border-beam"
import {MessageCircle, MonitorSmartphone, PenLine } from "lucide-react"

const HeroDisplay_animations = () => {
  return (
    <div className="h-[40%] max-lg:hidden  overflow-visible flex items-center gap-4  justify-center ">
  <div className="w-[30%] rounded flex flex-col  px-6  morphismBg py-8 relative">
    <BorderBeam size={300}/>
    <div className="flex gap-x-1 items-center">
    <PenLine size={20} />

    <h1 className="font-bold text-xl">Efficient Content Creation: </h1>
    </div>
    <p className=""> Streamline your writing process with intuitive tools.</p>
  </div>

  <div className="w-[30%] rounded flex flex-col  px-6  morphismBg py-8 relative">
  <BorderBeam size={300}/>
<div className="flex gap-x-1 items-center">
  <MessageCircle size={20}/>
  
    <h1 className="font-bold text-xl">
    Interactive Engagement
    </h1>
    </div>
    <p className="">Foster community with built-in commenting and sharing features.</p>
  </div>

  <div className="w-[30%] rounded flex flex-col  px-6  morphismBg py-8 relative">
  <BorderBeam size={300}/>

  <div className="flex gap-x-1 items-center">

  <MonitorSmartphone size={20} />
    <h1 className="font-bold text-xl">24 hour active service</h1>
    </div>
    <p className=""> Easily organize and edit your posts with our user-friendly interface.</p>
  </div>
  

    </div>
  )
}

export default HeroDisplay_animations