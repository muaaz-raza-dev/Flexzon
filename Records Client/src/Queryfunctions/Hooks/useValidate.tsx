import Cookies from "js-cookie"
import Axios from "../axios"
import { useAppDispatch, useAppSelector } from "@/app/ReduxHooks"
import { CreditsInsertion } from "@/app/Slices/CredentialSlice"
import { insertion } from "@/app/Slices/LandingSlice"

const useValidate = async() => {
    let token = Cookies.get("Records_session")
    let dispatch=useAppDispatch()
    let data=useAppSelector(state=>state.credits)
    let loading=true
    if (!data.isLogined) {
        if (token) {
            let response =await Axios.post("/auth/verify",{token})
            loading=false
            if (response.data.success==true) {
                
                dispatch(CreditsInsertion({Info:response.data.payload,isLogined:true,isLoading:false}))
                dispatch(insertion({tabs:response.data.payload.interests}))
            }
            else{
        dispatch(CreditsInsertion({isLoading:false}))
            }
    }
    else{
        loading=false
    }
}
    else{
        loading=false
        dispatch(CreditsInsertion({isLoading:false}))
    }
    return loading
}

export default useValidate
