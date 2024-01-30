import MainStatsBox from "./MainStatsBox"

const MainStaticsFile = () => {
  return (
    <div className=" w-full py-12 flex justify-center ">
    <div className="md:w-[90%] flex flex-col gap-y-8">
        <div className="flex justify-between">
       <MainStatsBox/>
       <MainStatsBox/>
        </div>
        </div>
        </div>
  )
}

export default MainStaticsFile
