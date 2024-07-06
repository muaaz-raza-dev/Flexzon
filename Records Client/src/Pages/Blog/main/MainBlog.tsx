import PollingView from './PollnQ/PollingView'
import { useAppSelector } from '@/app/ReduxHooks'
import QuestionView from './PollnQ/QuestionView'
import 'quill/dist/quill.snow.css';
const MainBlog = () => {
  let {data} = useAppSelector(state=>state.Blog)
  return (
    <main className="flex flex-col w-full">
      <header className="flex items-center justify-center w-full p-2 mb-4 rounded-lg ">
              <img
              loading='eager'
                src={data?.banner || "/images/Records.png"}
                alt=""
                className="object-contain w-lg max-h-96 "
              />

      </header>
      <div className=" h-max w-full ql-snow text-lg font-['Roboto']">
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
