// import { useAppSelector } from '@/app/ReduxHooks'
import { Iblog } from '@/app/Types/Ilanding'

const MainBlog = ({data}:Iblog|any) => {
  
  return (
    <main className="flex flex-col w-full">
      <header className="w-full flex items-center justify-center p-2 mb-4 ">
      {["mp3", "mp4"].includes(data?.banner.split(".")[3]) ? (
              <video src={data.banner}  loop autoPlay controls ></video>
            ) : (
              <img
                src={data?.banner || "/images/Records.png"}
                alt=""
                className=" object-contain "
              />
            )}
     

      </header>
      <div className="text-xl">
<p className="whitespace-pre-wrap" dangerouslySetInnerHTML={{__html:data.content}}>
</p>

      </div>
{/* <PollnQ data={data}/> */}
    </main>
  )
}

// const PollnQ=({data}:Iblog|any)=>{
//   let BlogState=useAppSelector(state=>state.Blog)
//   if (BlogState.data?.AdditonalAssetsType) {
//     return (
//       <div className='w-full p-6 flex gap-y-4 flex-col border-2 border-dashed rounded border-black my-4 '>
// <h1 className='hFont text-2xl '>{BlogState.data.Poll?.title}</h1>
// <div className="flex flex-col gap-2">
//   {
//  BlogState.data.Poll&&   BlogState.data.Poll.options.map(elm=>{
//   if (1==1) {
//     return( 
//       <button className="w-full hover:outline-2 outline-white hover:text-white transition hover:bg-[var(--primary)] cursor-pointer font-semibold border-[var(--primary)] border   rounded-full p-2">{elm.title}</button>
//       )
//     }
//     else{
//       return(
//         <div className="flex justify-between border rounded-md items-center px-4">
//       <div className="w-[90%]  transition bg-gradient-to-r 
//       from-gray-400 from-70% to-white to-30% text-[var(--primary)] cursor-default font-semibold border-[var(--primary)] border  rounded p-2">
//         {elm.title} </div>
//         <div className="">25%</div>
//       </div>
//         )

//     }
//     }
//     )
//   }
// </div>
// </div> 
// )
// }
// }


export default MainBlog
