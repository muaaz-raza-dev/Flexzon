import { useAppSelector } from "@/app/ReduxHooks"
import useFetchNotification from "../Notification/Hook/useFetchNotification"
import HeroSection from "./header/Hero/HeroSection"
import { LpHeaderFile } from "./header/lpHeaderFile"
import { LpMainContent } from "./main/lpMainContent"
import LpSidebarFile    from "./sidebar/LpSidebarFile"
import Headline from "./header/lpHeadline"
const LandingFile = () => {
    let credits =useAppSelector(state=>state.credits)
    if (credits.isLogined) {
        useFetchNotification();
    }

return (
    <div className="">
                {credits.isLogined?<Headline/>:<HeroSection/>}

    <main className="flex justify-between w-full md:gap-y-4 max-md:flex-col-reverse">

        <section aria-label="Main part" className="md:w-[70%] max-md:w-full md:py-6 max-md:py-2  flex items-center flex-col">
            <div className="md:w-[85%]  max-md:w-[98%]   flex flex-col gap-y-4  ">
            
<LpHeaderFile/>
<LpMainContent/>
            </div>
        </section>
        <section  className="flex md:py-8 max-md:pt-2 max-md:hidden  lg:pl-2 max-lg:px-1 md:w-[40%] max-md:w-full   md:min-h-[90vh]  border-l">
<LpSidebarFile/>
        </section>
    </main>
    </div>
  )
}

export default LandingFile