import GetOtp from "@/Queryfunctions/Auth/OTP"
import { useAppDispatch } from "@/app/ReduxHooks"
import { CreditsInsertion } from "@/app/Slices/CredentialSlice"
import { toast } from "react-hot-toast"
import { useMutation } from "react-query"

const useOtpRequest = (Inputs:{
    email:string,
    newPassword:string,
    otp:string}) => {
let dispatch = useAppDispatch()

    let ReqOTP=useMutation({mutationKey:"OTP Requested",mutationFn:()=>GetOtp(Inputs.email) ,onError(err:any) {
        toast.error(err?.response?.data?.msg)
        
      }, onSuccess() {
        dispatch(CreditsInsertion({OTPRequest:true}))
      },})
      return ReqOTP
}

export default useOtpRequest
