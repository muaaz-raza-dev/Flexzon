import PollingView from './PollnQ/PollingView'
import { useAppSelector } from '@/app/ReduxHooks'
import QuestionView from './PollnQ/QuestionView'
import 'quill/dist/quill.snow.css';
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
                className="object-contain "
              />
            )}
     
      </header>
      <div className="text-xl h-max w-full ql-snow">
<div className=" w-full flex flex-col ql-editor" dangerouslySetInnerHTML={{__html:data?.content||""}}>
</div>
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
