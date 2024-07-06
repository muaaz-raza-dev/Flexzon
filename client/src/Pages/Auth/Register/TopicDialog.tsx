import Registeration from "@/Queryfunctions/Auth/Registeration"
import { useAppDispatch, useAppSelector } from "@/app/ReduxHooks"
import { AuthInsertion } from "@/app/Slices/AuthSlice"
import { Credits, CreditsInsertion } from "@/app/Slices/CredentialSlice"
import { Checkbox } from "@/components/ui/checkbox"
import {Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { FC, useState } from "react"
import { toast } from "react-hot-toast"
import  Cookies from "js-cookie"
import { Link, useNavigate } from "react-router-dom"
import { LightLoader } from "@/Essentials/Loader"
import { insertion } from "@/app/Slices/LandingSlice"
import UploadImage from "@/app/middlewares/functions/ImageUploader"
import { useToast } from "@/components/ui/use-toast"
  interface TopicDialog {
    title:string,
    loading:boolean,
  }
const TopicDialog:FC<TopicDialog> = ({title,loading}) => {
  let data = useAppSelector(state=>state.landing)
  let Auth = useAppSelector(state=>state.auth)
  let {toast: toastShadcn,}  =useToast()
  let navigate= useNavigate()
  const [Loading, setLoading] = useState<boolean>(false);
  let dispatch = useAppDispatch()
  let RegisterationSumbit = async()=>{
    setLoading(true)
   if (Auth.register.avatarBlob ) {
     await UploadImage(Auth.register.avatarBlob).then(data=>{
       dispatch(AuthInsertion({purpose:"register", avatar:data.url}))
       Registeration(Auth.register).then(data=>{
         if (data.success===true) {
        toastShadcn({    title: "Successfully created your profile .",
          description: "Now you can personlaize your email , social media handles and more...",
          action: <Link to={"/profile/settings"} >Go to settings</Link>,})
        Cookies.set("Records_session",data.token,{expires:1.296e+9})
        dispatch(CreditsInsertion({isLogined:true,Info:{...Credits.Info,...data.payload}}))
        dispatch(insertion({tabs:data.payload.interests}))
        dispatch(AuthInsertion({purpose:"register", Name:"",bio:"",email:"",avatar:"",Topics:[],username:"",password:"",}))
        location.pathname ="/"
        }
        else{
          toast.error(data.msg)
        }
      }).catch(err=>{
        toast.error(err.response.data.msg)
      }).finally(()=>{
        setLoading(false)
      })
    }).catch(()=>{
      toast.error("Failed to upload, Try again!")
    })
    }
    else{
      Registeration(Auth.register).then(data=>{
        if (data.success===true) {
       toast.success("Logined to your account")
       toastShadcn({    title: "Successfully created your profile .",
       description: "Now you can personlaize your email , social media handles and more...",
       action: <Link to={"/profile/settings"} >Go to settings</Link>,})
      
       Cookies.set("Records_session",data.token,{expires:1.296e+9})
       dispatch(CreditsInsertion({isLogined:true,Info:{...Credits.Info,...data.payload}}))
       dispatch(insertion({tabs:data.payload.interests}))
       navigate("/")
       dispatch(AuthInsertion({purpose:"register", Name:"",bio:"",email:"",avatar:"",Topics:[],username:"",password:"",}))
       }
       else{
         toast.error(data.msg)
       }
     }).catch(err=>{
       toast.error(err.response.data.msg)
     }).finally(()=>{
       setLoading(false)
       
     })
    }

        }
  return (
    <Dialog>
  <DialogTrigger className="w-full">{loading===false&&title}</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Find your interests</DialogTitle>
      <DialogDescription>
        Select at least 3 topics from follwing list
        <div className="flex flex-wrap w-full my-4 items-center gap-3">
            {data.Topics.map((elm)=> <div key={elm._id} className="flex items-center gap-x-2">
<Checkbox id={elm._id} className="ToggleRadio" checked={Auth.register.Topics.includes(elm.topic._id)}  onCheckedChange={(e)=>{
  if (e ===true) {
   dispatch(AuthInsertion({purpose:"register",Topics:[...Auth.register.Topics,elm.topic._id]}))
  }
  else{
   dispatch(AuthInsertion({purpose:"register",Topics:Auth.register.Topics.filter(topic=>topic!==elm.topic._id)}))
  }
}}/>
                <Label htmlFor={elm._id}>
    {elm._id}
                    </Label>
            </div>)}
        </div>
        <button onClick={RegisterationSumbit} className="uppercase block w-full p-1 text-lg rounded-full bg-[var(--primary)] hover:bg-[black] text-white transition-colors focus:outline-none"> 
        {
          Loading? <LightLoader/>:
        "Proceed"
        }
         </button>
      </DialogDescription>
    
    </DialogHeader>
 
  </DialogContent>
</Dialog>

  )
}

export default TopicDialog
