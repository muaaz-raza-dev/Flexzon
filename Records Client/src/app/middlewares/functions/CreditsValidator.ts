import { insertion } from "@/app/Slices/LandingSlice"
import { Icredits } from "@/app/Types/ICredits"


const CreditsValidator = <T,K>(state:Icredits,fn:T,dispatch:K,parameter?:string) => {
 if (state.isLogined) {
    if (typeof fn=="function") {
        fn(parameter||"")
    }
}
else{
    if (typeof dispatch=="function") {
    dispatch(insertion({ValidModal:true}))
}
}
}

export default CreditsValidator
