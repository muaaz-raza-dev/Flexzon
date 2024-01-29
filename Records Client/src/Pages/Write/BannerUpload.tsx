import { useAppDispatch, useAppSelector } from "@/app/ReduxHooks"
import { FileUploader } from "react-drag-drop-files"
import {useState,useRef} from "react"
import { Upload } from "lucide-react";
import UploadImage from "@/app/middlewares/functions/ImageUploader";
import { WriteInsertion } from "@/app/Slices/WriteSlice";
import { toast } from "react-hot-toast";
import {useEffect} from "react"
const BannerUploadB = () => {
  const writeState =useAppSelector(state=>state.write)
const [ImageURI, setImageURI] = useState<{sample:string,blob?:Blob|null}>({sample:writeState.Banner});
useEffect(() => {
  localStorage.getItem("Banner_Post")&&setImageURI({sample:localStorage.getItem("Banner_Post")||""})
}, []);
let fileRef =useRef()
  let dispatch = useAppDispatch()
  return (
    <section className="w-full flex flex-col items-center gap-y-4">
        <div className="max-md:w-[90%] md:w-[75%]  ">
<div className={`${!ImageURI.sample&&"bg-gray-500"} border-2 p-2 object-contain w-full flex items-center justify-center text-white  `}>
            {
              !ImageURI.sample?
              " Your Banner will be showing here."
              :
              <>
              <img src={ImageURI.sample} alt="" className="w-full"  />
              <video src={ImageURI.sample} autoPlay controls loop/>
              </>
            }
        </div>
        </div>
<div className="max-md:w-full  center p-2 overflow-hidden">
<FileUploader className={"!w-[34px] !h-8"}  multiple={false} ref={fileRef} label="Upload your banner" file={true} handleChange={(file:Blob)=>{
  setImageURI({sample:URL.createObjectURL(file),blob:file})
}} types={["PNG","JPG","JPEG","mp3","mp4"]} maxSize={10485760}  />
</div>
<div className="flex gap-x-4">
{
  ImageURI.blob&&
<button onClick={()=>{ImageURI.blob&&UploadImage(ImageURI?.blob).then(data=>{
  dispatch(WriteInsertion({Banner:data.url}))
  setImageURI({...ImageURI,blob:null})
  localStorage.setItem("Banner_Post",data.url) // For draft puropose
  toast.success("Banner uploaded")
}
)
}} className="p-2 w-fit rounded text-md text-white bg-[var(--primary)] flex gap-x-2">
Upload
  <Upload size={20}/>
</button>
}
</div>

    </section>
  )
}

export default BannerUploadB
