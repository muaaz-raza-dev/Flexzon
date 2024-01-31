import { Iblog } from '@/app/Types/Ilanding'

const MainBlog = ({data}:Iblog|any) => {
  
  return (
    <main className="flex flex-col w-full">
      <header className="w-full flex items-center justify-center p-2 ">
      {["mp3", "mp4"].includes(data?.banner.split(".")[3]) ? (
              <video src={data.banner}  loop autoPlay controls ></video>
            ) : (
              <img
                src={data?.banner || "/images/Records.png"}
                alt=""
                className=" object-contain rounded aspect-square"
              />
            )}
     

      </header>
      <div className="text-xl">
<p className="whitespace-pre-wrap" dangerouslySetInnerHTML={{__html:data.content}}>

</p>
      </div>
    </main>
  )
}

export default MainBlog
