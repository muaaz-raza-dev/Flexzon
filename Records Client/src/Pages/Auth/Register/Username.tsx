import { SmallLoader } from "@/Essentials/Loader";
import usernameValidation from "@/Queryfunctions/validation/usernameValidation";
import { useAppDispatch } from "@/app/ReduxHooks";
import { AuthInsertion } from "@/app/Slices/AuthSlice";
import { Ban, Verified } from "lucide-react";
import { useState,useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
interface IusernameState{
    loading:boolean;
    success:boolean
}
const Username = () => {
    const [username, setusername] = useState<string>("");
    const [state, setState] = useState<IusernameState>({loading:true,success:false});
    let dispatch =useAppDispatch()
    const debouced = useDebouncedCallback((output)=>{
        usernameValidation(output).then(data=>{
            if (data?.success===true) {
                setState({success:true,loading:false})
                dispatch(AuthInsertion({purpose:"register",username:output}))
            }
            else{
                setState({success:false,loading:false})
            }
            })
        },500)
        useEffect(() => {
            if (username!=="") {
             
                debouced(username)
            }
        }, [username]);  

        
  return (
    <div className="pb-2 pt-2 w-full relative">
        <div className="absolute right-4 top-[40%]">
            {state.loading===true?
            username!==""?
<SmallLoader/>:"":
state.success?
<Verified className="text-green-500"/>:<Ban  className="text-red-500"/>

}
        </div>
    <input className="block w-full p-4 text-lg rounded border-[var(--secondary)] border-2 focus:border-black placeholder:text-gray-500 " type="text" name="username" id="username"  onChange={(e)=>{setusername(e.target.value) 
setState({success:false,loading:true})
}
} placeholder="username"/>
</div>
  )
}

export default Username
