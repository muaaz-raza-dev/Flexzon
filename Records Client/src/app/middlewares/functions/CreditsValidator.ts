import { insertion } from "@/app/Slices/LandingSlice"
import { Icredits } from "@/app/Types/ICredits"


const CreditsValidator = <T,K>(state:Icredits,fn:T,dispatch:K) => {
 if (state.isLogined) {
    if (typeof fn=="function") {
        fn()
    }
}
else{
    if (typeof dispatch=="function") {
    dispatch(insertion({ValidModal:true}))
}
}
}

export default CreditsValidator
