import { useAppDispatch, useAppSelector } from "@/app/ReduxHooks"
import { FileUploader } from "react-drag-drop-files"
import {useState,useRef} from "react"
import { WriteInsertion } from "@/app/Slices/WriteSlice";
import {useEffect} from "react"
const BannerUploadB = () => {
  const writeState =useAppSelector(state=>state.write)
const [ImageURI, setImageURI] = useState<{sample:string,blob?:Blob|null}>({sample:writeState.Banner});
useEffect(() => {
  if(localStorage.getItem("Banner_Post"))setImageURI({sample:localStorage.getItem("Banner_Post")||""})
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
             ["mp3","mp4"].includes(ImageURI.sample.split(".")[ImageURI.sample.split(".").length-1]) ?
             <video src={ImageURI.sample} autoPlay controls loop/>:
             <img src={ImageURI.sample} alt="" className="w-full"  />
            }
        </div>
        </div>
<div className="max-md:w-full  center p-2 overflow-hidden">
<FileUploader className={"!w-[34px] !h-8"}  multiple={false} ref={fileRef} label="Upload your banner" file={true} handleChange={(file:Blob)=>{
  setImageURI({sample:URL.createObjectURL(file),blob:file})
  dispatch(WriteInsertion({BannerBlob:file}))
  
}} types={["PNG","JPG","JPEG","mp3","mp4"]} maxSize={10485760}  />
</div>
<div className="flex gap-x-4">

</div>

    </section>
  )
}

export default BannerUploadB
