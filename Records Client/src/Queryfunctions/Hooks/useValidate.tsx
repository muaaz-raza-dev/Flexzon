import Cookies from "js-cookie"
import Axios from "../axios"
import { useAppDispatch, useAppSelector } from "@/app/ReduxHooks"
import { CreditsInsertion } from "@/app/Slices/CredentialSlice"
import { insertion } from "@/app/Slices/LandingSlice"

const useValidate = async() => {
    let token = Cookies.get("Records_session")
    let dispatch=useAppDispatch()
    let data=useAppSelector(state=>state.credits)
    if (!data.isLogined) {
        if (token) {
            let response =await Axios.post("/auth/verify",{token})
                dispatch(CreditsInsertion({Info:response.data.payload,isLogined:true}))
                dispatch(insertion({tabs:response.data.payload.interests}))
    }
}
    else{

    }
}

export default useValidate
