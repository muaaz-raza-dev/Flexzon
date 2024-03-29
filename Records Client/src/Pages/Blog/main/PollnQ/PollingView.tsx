import { useAppSelector } from '@/app/ReduxHooks'
import CreditsValidator from '@/app/middlewares/functions/CreditsValidator'
import usePollVote from '../Hooks/usePollVote'
const PollingView=()=>{
    let BlogState=useAppSelector(state=>state.Blog)
    let credits =useAppSelector(state=>state.credits)
    if (BlogState.data?.AdditonalAssetsType=="Poll"&&BlogState.data.Poll) {
      let {mutate,dispatch}=usePollVote(BlogState.data.Poll)
    
      return (
        <div className='w-full px-6 py-3 flex gap-y-4 flex-col border-2 border-dashed rounded 
        border-[#00000059] my-4 '>
  <h1 className='hFont text-2xl  '>{BlogState.data.Poll?.title}</h1>
  <div className="flex flex-col gap-2">
    {
   BlogState.data.Poll&&   BlogState.data.Poll.options.map(elm=>{
    if (!BlogState.data?.Poll?.Polled) {
      return( 
        <button className="w-full hover:outline-2 outline-white hover:text-white transition hover:bg-[var(--primary)] cursor-pointer font-semibold border-[var(--primary)] border   rounded-full p-2" onClick={()=>{
         CreditsValidator(credits,mutate,dispatch,elm.title)
        }}>{elm.title}</button>
        )
      }
      else{
        
        let gradient = {backgroundImage:`
         linear-gradient(to right, #161a3040 ${elm.votes}%,white 0%) `}
    
        
        return(
          <div  className="flex  justify-between transition pr-2 rounded-lg items-center ">
        <button style={gradient} className={`w-[95%]  text-start transition  text-[var(--primary)]  font-semibold  text-sm border-[var(--primary)] border  rounded-md p-2 px-4`}>
          {elm.title} </button>
          <div className="px-4 w-[5%] hFont">{elm.votes}%</div>
        </div>
          )
  
      }
      }
      )
    }
  <b className='text-sm'>{BlogState.data.Poll.total} vote{BlogState.data.Poll.total>1&&"s"}</b>
  </div>
  </div> 
  )
  }
  }

export default PollingView
