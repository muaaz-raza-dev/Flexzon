import { useAppSelector } from "@/app/ReduxHooks"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import { FC, useEffect, useState } from "react"


export interface IchangeHandlerInput <T>{
  e?:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>,payload?: {Header:any,data:T}
}
export interface IChangeHandler{
    ChangeHandler:<T>(
      {e,payload}:IchangeHandlerInput<T>
      )=>void
  
}
const ContactNumberDetails:FC<IChangeHandler> = ({ChangeHandler}) => {
const [ContactState, setContactState] = useState({value:"",display:false});
    let {email} = useAppSelector(state=>state.credits.Info)
    useEffect(() => {
      ChangeHandler<typeof ContactState>({payload:{Header:"contact",data:ContactState}})
    }, [ContactState]);
  return (
<section className="flex gap-x-4 flex-col ">
        <label htmlFor="Contact" className="hFont text-xl py-2" >Contact Number</label>
        <div className="flex gap-x-4 items-center justify-between w-[80%]">

        <div className="md:w-[90%]  flex  flex-col gap-y0.5 justify-center">
<Input onChange={(e)=>setContactState({...ContactState,value:e.target.value})} type="number" id="Contact" className=" focus-visible:ring-0 focus-visible:border-black border" name="Contact" placeholder="contact number " defaultValue={email}/>
        </div>
        <div className="flex flex-col center ">
            <Label className="font-bold text-xs "> Visiblity </Label>
        <Switch 
        onCheckedChange={e=>setContactState({...ContactState,display:e,})}
        checked={ContactState.display}
        className="!bg-[var(--light)] ToggleShadCn aspect-square mb-2"
        />
        </div>
        </div>
      </section>
  )
}


export const GenderDetails:FC<IChangeHandler> = ({ChangeHandler}) => {
  const [GenderState, setGenderState] = useState({value:"",display:false});
  const [DobState, setDobState] = useState({value:"",display:false});
      let {gender,dob} = useAppSelector(state=>state.credits.Info)
      useEffect(() => {
        ChangeHandler<typeof GenderState>({payload:{Header:"gender",data:GenderState}})
      }, [GenderState]);
      useEffect(() => {
        ChangeHandler<typeof DobState>({payload:{Header:"dob",data:DobState}})
      }, [DobState]);
    return (
  <section className="flex gap-x-4 flex-col ">
          <label htmlFor="Contact" className="hFont text-xl py-2" >Gender & Date of Birth</label>
          <div className="flex gap-x-4  justify-between w-[80%] flex-col">
  
          <div className="md:w-[50%]  flex  justify-between items-center  gap-y-0.5 ">
            
          <DropdownMenu>
    <DropdownMenuTrigger className="  w-[80%] py-2 border bg-white overflow-hidden  focus-visible:ring-0 items-end object-center  focus-within:ring-0 outline-0 active:ring-0 ring-0">
      {GenderState.value||gender?.value||"Gender"}
    </DropdownMenuTrigger>
    <DropdownMenuContent className="mx-2 z-[600]">
      {
        ["Male","Female","Other"].map(elm=>{
return<DropdownMenuItem className="cursor-pointer border-b-2" onClick={()=>setGenderState({...GenderState,value:elm})}>
{elm}
      </DropdownMenuItem>
      })
    }
    </DropdownMenuContent>
  </DropdownMenu>

          <div className="flex flex-col center ">
              <Label className="font-bold text-xs "> Visiblity </Label>
          <Switch 
          onCheckedChange={e=>setGenderState({...GenderState,display:e,})}
          checked={GenderState.display}
          className="!bg-[var(--light)] ToggleShadCn aspect-square mb-2"
          />
          </div>

          </div>


          <div className="md:w-[50%]  flex  justify-between items-center gap-x-2  gap-y-0.5 ">
            
<Input onChange={(e)=>setDobState({...DobState,value:e.target.value})} type="date" id="Contact" className=" focus-visible:ring-0 focus-visible:border-black border w-[80%]" name="Contact" placeholder="Email" defaultValue={dob?.value}/>
  
            <div className="flex flex-col center ">
                <Label className="font-bold text-xs " htmlFor="dobTOggle"> Visiblity </Label>
            <Switch 
            id="dobTOggle"
            onCheckedChange={e=>setDobState({...DobState,display:e,})}
            checked={DobState.display}
            className="!bg-[var(--light)] ToggleShadCn aspect-square mb-2"
            />
            </div>
  
            </div>
          </div>
        </section>
    )
  }


export const WebsiteDetails:FC<IChangeHandler> = ({ChangeHandler})=>{
    const [Website, setWebsite] = useState({url:"",altText:""});
    let {website} = useAppSelector(state=>state.credits.Info)
    useEffect(() => {
      ChangeHandler<typeof Website>({payload:{Header:"webiste",data:Website}})

    }, [Website]);
return(
<section className="flex gap-x-4 flex-col ">
        <label htmlFor="Website" className="hFont text-xl py-2" >Portfolio/Webiste</label>
        <div className="flex gap-x-4 items-center justify-between w-[80%]">
        <div className="md:w-[60%]  flex  flex-col gap-y0.5 justify-center">
<Input onChange={(e)=>setWebsite({...Website,url:e.target.value})} type="contact" id="Website" className=" focus-visible:ring-0 focus-visible:border-black border" name="Website" placeholder="Url i.e https://blogger.vercel.app " defaultValue={website?.url}/>
        </div>
        <div className="flex flex-col center w-[40%]">
        <Input onChange={(e)=>setWebsite({...Website,altText:e.target.value})} type="contact" id="Website" className=" focus-visible:ring-0 focus-visible:border-black border" name="Website" placeholder="Alt text i.e My portfolio" defaultValue={website?.altText}/>
       
        </div>
        </div>
      </section>
)
  }



  export const SocialMediaDetails:FC<IChangeHandler> = ({ChangeHandler})=>{
    const [SocialMedia, setSocialMedia] = useState({fb:"",insta:"",linkedIn:""});
    const [ToggleState, setToggleState] = useState<{toggle:boolean,refrence:"fb"|"insta"|"linkedIn"}>({toggle:false,refrence:"fb"});
    let {Links} = useAppSelector(state=>state.credits.Info)
    useEffect(() => {
      ChangeHandler<typeof SocialMedia>({payload:{Header:"webiste",data:SocialMedia}})
    }, [SocialMedia]);
return(
<section className="flex gap-x-4 flex-col ">
        <label htmlFor="Website" className="hFont text-xl py-2" >Social Media</label>

        <div className="flex gap-x-4 items-center  w-[80%]">
          {
            ToggleState.toggle&&
        <Input onChange={(e)=>setSocialMedia({...SocialMedia,[ToggleState.refrence]:e.target.value})} type="number" id="Contact" className=" focus-visible:ring-0 focus-visible:border-black border" name="Contact" placeholder="contact number " defaultValue={Links&&Links[ToggleState.refrence]||""} />
          }
          <div onClick={(e)=>setToggleState({toggle:!ToggleState.toggle,refrence:"linkedIn"})} className={`w-[7%] border-2 ${Links?.linkedIn==""||!Links?.linkedIn? "border-red-500":"border-green-500"}  max-md:w-[12%] cursor-pointer  text-white  primary aspect-square center rounded-full`}>
            <Linkedin className="max-md:w-6"/>
          </div>
          <div onClick={(e)=>setToggleState({toggle:!ToggleState.toggle,refrence:"insta"})} className={`w-[7%] border-2 ${Links?.insta==""||!Links?.insta? "border-red-500":"border-green-500"}  max-md:w-[12%] cursor-pointer   text-white primary aspect-square center rounded-full`}>
            <Instagram className="max-md:w-6"/>
          </div>
          <div onClick={(e)=>setToggleState({toggle:!ToggleState.toggle,refrence:"fb"})} className={`w-[7%] max-md:w-[12%] border-2 ${Links?.fb==""||!Links?.fb? "border-red-500":"border-green-500"}  cursor-pointer  text-white  primary aspect-square center rounded-full`}>
            <Facebook className="max-md:w-6"/>
          </div>
     </div>
      </section>
)
  }
export default ContactNumberDetails
