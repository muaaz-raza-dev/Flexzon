import TopCreators from "../main/TopCreators"
import { RecommendedTopics } from "./RecommendedTopics"

import { TrendingSection } from "./TrendingSection"


const LpSidebarFile = () => {
  return (


    <aside className=" pt-3  px-2 max-md:px-2  py-2 flex flex-col 
     z-[20]   Headerlp w-full gap-y-5    flex-wrap md:sticky md:top-10 h-max">
      <TrendingSection/>
      <TopCreators/>
      <RecommendedTopics/>
    <footer className="border-t pr-2  flex gap-x-3  text-sm my-1">
<div className="py-2">@2024 <b>Flexzon</b> , Inc. all rights reserved  <a href="https://www.github.com/muaaz-raza-dev" className=" font-bold no-underline hFont"
 target="_blank" rel="noopener noreferrer">
.
</a>
</div>
    </footer>
    </aside>

  )
}

export default LpSidebarFile
