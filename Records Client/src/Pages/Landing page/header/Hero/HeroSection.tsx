import { useAppSelector } from "@/app/ReduxHooks"
import { Link } from "react-router-dom"
import './Hero.css'

import Navbar from "@/Essentials/Navbar/Navbar"
import Meteors from "@/components/magicui/meteors"
import HeroTitle  from "./HeroTitle"
import HeroDisplay_animations from "./HeroDisplay_animations"
import ShimmerButton from "@/components/magicui/shimmer-button"
import { GitHubLogoIcon } from "@radix-ui/react-icons"
import AvatarCircles from "@/components/magicui/avatar-circles"
const HeroSection = () => {
  let {isLogined}=useAppSelector(state=>state.credits)
  let {Creators} =useAppSelector(s=>s.landing)
  if (!isLogined) {
    return (
      <div className="relative md:h-[90vh] max-md:h-[70vh] overflow-hidden before:absolute before:top-0 before:start-1/2 before:bg-[url('/images/mesh-gradient.png')] before:bg-no-repeat before:bg-top before:bg-cover before:w-full before:h-full before:-z-[1] before:transform before:-translate-x-1/2 
      dark:before:bg-[url('/images/mesh-gradient.png')] backdrop-blur-sm">
        <div className="my-2  mx-5 z-[999]">
        <Navbar transparent/>
        </div>
  <div className=" max-w-[85rem] max-lg:h-full lg:h-[60%] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10">
 <HeroTitle/>
          <Meteors number={25}/>
    <div className="mt-5 max-w-3xl text-center mx-auto z-40">
      <p className="md:text-lg max-md:text-md text-black lg:text-xl"> Your flexible platform for sparking ideas, sharing blogs, and connecting with creators. Craft effortlessly and share seamlessly – your creative journey simplified.</p>
    </div>

    {/* <!-- Buttons --> */}
    <div className="mt-6 gap-3 flex justify-center z-40">

      <Link to={"/auth/login"} className="" >
      <ShimmerButton className="flex gap-2 !rounded-md text-[var(--primary)] font-semibold shadow-md"  background="#f4f4f4" >
      Get Started
      </ShimmerButton>
      </Link>  
      <a href="https://github.com/muaaz-raza-dev/Flexzon" target="_blank"  >
      <ShimmerButton className="flex gap-2 !bg-[var(--primary)]" >

      <GitHubLogoIcon/>
       Github
      </ShimmerButton>
      </a>
    
    </div>
    <div className="center my-7 gap-3">
      <AvatarCircles avatarUrls={Creators.docs.map(e=>e.avatar)}/>
      <div className="font-semibold leading-tight flex items-end justify-end flex-col">
      <h1 className=" leading-tight">Over {Creators.total-1}+ </h1>
      <p  className=" leading-tight"> Active Creators</p>
      </div>
    </div>

  </div>
<HeroDisplay_animations/>
</div>
  )
}
}

export default HeroSection
