import  { VerifyOtp } from "@/Queryfunctions/Auth/OTP"
import { useAppDispatch } from "@/app/ReduxHooks"
import { CreditsInsertion } from "@/app/Slices/CredentialSlice"
import Cookies from "js-cookie"
import { toast } from "react-hot-toast"
import { useMutation } from "react-query"
import { useNavigate } from "react-router-dom"

const useOtpVerify = (Inputs:{
    email:string,
    newPassword:string,
    otp:string}) => {
let dispatch = useAppDispatch()
let navigate =useNavigate()
    let VerifiedOtp=useMutation({mutationKey:"OTP Verify",mutationFn:()=>VerifyOtp(Inputs.newPassword,Inputs.otp) ,onError(err:any) {
        toast.error(err?.response?.data?.msg)
      }, onSuccess() {
        navigate("/auth/login")
        Cookies.remove("ROR")
        dispatch(CreditsInsertion({OTPRequest:false}))
        toast.success("Login with your new password")
      },})
      return VerifiedOtp
}

export default useOtpVerify