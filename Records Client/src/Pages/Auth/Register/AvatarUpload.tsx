import { useAppDispatch, useAppSelector } from "@/app/ReduxHooks";
import { AuthInsertion } from "@/app/Slices/AuthSlice";
import UploadImage from "@/app/middlewares/functions/ImageUploader";
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { useState } from "react"
import  toast  from "react-hot-toast";
interface IfileType{
uri:string;
file?:Blob;
loading?:boolean;
}
const AvatarUpload = () => {
    let data=useAppSelector(state=>state.auth)
    
    const [File, setFile] = useState<IfileType>({uri:data.register.avatar||"",loading:false})
    let dispatch = useAppDispatch()
    let UploadHandler=()=>{
        setFile({...File,loading:true})
if (File.file) {
    UploadImage(File.file).then(data=>{
    dispatch(AuthInsertion({purpose:"register", avatar:data.url}))
    setFile({...File,loading:false})

    }).catch(()=>{
        toast.error("Failed to upload, Try again!")
    })
    }
}
  return (
      <div className={`pb-2 pt-4  w-full p-2 px-6 text-lg rounded border-[var(--secondary)] border-2 focus:border-black flex items-center justify-between ${File.loading===true&&"animate-pulse"}`}>
                <Avatar className="w-20 h-20 aspect-sqaure text-xs bg-gray-200 flex items-center justify-center text-white tracking-tighter border-gray-700 border-2 ">
                    <AvatarImage src={File.uri||"/images/anonymous.png"}  />
                    {/* <p>Profile picture</p> */}
                    </Avatar>
                    <div className="flex gap-x-3">
      { 
                data.register.avatar==""?      <label htmlFor="avatar"     className=" cursor-pointer text-green-500  font-bold">
            {
                File.uri==""?"Select Image":"Change"}
            </label> : <p>{data.register.username&& `@${data.register.username}`}</p> }
            {
                data.register.avatar==""&&
                File.uri!==""&&
                <button onClick={UploadHandler} className=" cursor-pointer text-orange-800 font-bold">Upload</button>
            }
                    </div>
                    <input type="file" multiple={false} onChange={(e)=>{
                        if (e?.target?.files) {
                           let imageURl= URL.createObjectURL(e.target.files[0])
                           setFile({uri:imageURl,file:e.target.files[0]})
                        }
                    }} size={1000} accept="image/*"  name="email" id="avatar" hidden placeholder="Full Name" className=" w-full p-4 text-lg rounded border-[var(--secondary)] border-2 focus:border-black hidden"/>
                </div>    
  )
}

export default AvatarUpload
