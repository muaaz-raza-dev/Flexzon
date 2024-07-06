import { useAppDispatch, useAppSelector } from "@/app/ReduxHooks"
import {useState} from "react"
import { WriteInsertion } from "@/app/Slices/WriteSlice";
import {useEffect} from "react"
import {useDropzone} from 'react-dropzone';
const BannerUploadB = () => {
  const writeState =useAppSelector(state=>state.write)
const [ImageURI, setImageURI] = useState<{sample:string,blob?:Blob|null}>({sample:writeState.Banner});
const { getRootProps, getInputProps} = useDropzone({accept: {'image/*': ["png","jpeg","jpg"]} ,multiple:false , maxSize:1024*1024*1024*5,
onDrop(file, fileRejections) {
  if(file){
    console.log(file);
    
    setImageURI({sample:URL.createObjectURL(file[0]),blob:file[0]})
    dispatch(WriteInsertion({BannerBlob:file[0]}))
  }
  else{
    console.log(fileRejections)
  }
},
});
console.log(ImageURI.sample);
useEffect(() => {
  if(localStorage.getItem("Banner_Post"))setImageURI({sample:localStorage.getItem("Banner_Post")||""})
}, []);
  let dispatch = useAppDispatch()
  return (
    <section className="flex flex-col items-center w-full gap-y-4">
        <div className="max-md:w-[90%] md:w-[75%] center ">
         
        <div className="max-w-lg max-h-96 object-contain ">

<div {...getRootProps({className: `dropzone aspect-w-4 max-h-full max-w-full  aspect-h-3 rounded p-2 object-contain flex items-center justify-center  ${ !ImageURI.sample&&"bg-[var(--primary)] text-white"} cursor-pointer  `})} >
        <input {...getInputProps()} />
    
            {
              !ImageURI.sample?
              "Upload your Banner"
              :
             <img src={ImageURI.sample} alt="" className="  object-contain max-w-lg max-h-96 "  />
            }
        </div>
        </div>

        </div>
<div className="flex flex-col items-center p-2 overflow-hidden max-md:w-full gap-y-2">
<div className="text-xs text-gray-500 font-bold">
Dimension 4:3 . File size must be less than 10 mb 
</div>
{/* 
<FileUploader className={"!w-[34px] !h-4"}  multiple={false} ref={fileRef} label="Upload your post banner"  file={true} 
handleChange={(file:Blob)=>{
  setImageURI({sample:URL.createObjectURL(file),blob:file})
  dispatch(WriteInsertion({BannerBlob:file}))
  
}} types={["PNG","JPG","JPEG"]} maxSize={10485760}  /> */}
</div>

    </section>
  )
}

export default BannerUploadB
