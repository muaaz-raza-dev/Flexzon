import { useAppSelector } from "@/app/ReduxHooks"
import useFetchNotification from "../Notification/Hook/useFetchNotification"
import HeroSection from "./header/Hero/HeroSection"
import { LpHeaderFile } from "./header/lpHeaderFile"
import TopCreators from "./main/TopCreators"
import { LpMainContent } from "./main/lpMainContent"
import LpSidebarFile    from "./sidebar/LpSidebarFile"
const LandingFile = () => {
    let credits =useAppSelector(state=>state.credits)
    if (credits.isLogined) {
        useFetchNotification();
    }

return (
    <div className="">
                <HeroSection/>
    <main className="flex justify-between w-full md:gap-y-4 max-md:flex-col-reverse">
        <section aria-label="Main part" className="md:w-[70%] max-md:w-full md:py-6 max-md:py-2  flex items-center flex-col">
            <div className="md:w-[95%]  max-md:w-full  flex flex-col gap-y-4 ">
                <div className="md:hidden max-md:visible">
<TopCreators/>
                </div>
<LpHeaderFile/>
<LpMainContent/>
            </div>
        </section>
        <section  className="flex md:py-8 max-md:pt-2  lg:pl-2 max-lg:px-1 md:w-[35%] max-md:w-full md:mt-16  md:min-h-[90vh]  border-l">
<LpSidebarFile/>
        </section>
    </main>
    </div>
  )
}

export default LandingFile