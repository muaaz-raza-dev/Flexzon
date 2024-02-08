import PollingView from './PollnQ/PollingView'
import { useAppSelector } from '@/app/ReduxHooks'
import QuestionView from './PollnQ/QuestionView'
const MainBlog = () => {
  let {data} = useAppSelector(state=>state.Blog)
  return (
    <main className="flex flex-col w-full">
      <header className="flex items-center justify-center w-full p-2 mb-4 rounded-lg ">
      {["mp3", "mp4"].includes((data?.banner||"")?.split(".")[3]) ? (
              <video src={data?.banner} className='rounded'  loop autoPlay controls ></video>
            ) : (
              <img
              loading='eager'
                src={data?.banner || "/images/Records.png"}
                alt=""
                onLoadedDataCapture={()=>{
                  console.log("I am loaded");
                  
                }}
                className="object-contain "
              />
            )}
     
      </header>
      <div className="text-xl">
<p className="whitespace-pre-wrap" dangerouslySetInnerHTML={{__html:data?.content||""}}>
</p>

      </div>
      {
        data?.AdditonalAssetsType=="Poll"?
<PollingView />:
<QuestionView/>
      }
    </main>
  )
}




export default MainBlog
