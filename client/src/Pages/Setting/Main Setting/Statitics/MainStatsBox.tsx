import { useAppSelector } from "@/app/ReduxHooks"

const MainStatsBox = () => {
  let credits = useAppSelector(state=>state.credits)

  return (
    <div className="flex w-[25%] flex-col  border-2 border-[var(--primary)] center py-2 rounded-lg ">
     <b className="text-xl">{credits.Info?.profileViews?.length}</b>
      <p>Profile Views last month</p>
    </div>
  )
}

export default MainStatsBox
