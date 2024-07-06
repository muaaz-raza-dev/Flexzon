import { IeachChat } from "@/app/Types/Ichat"

const OptimizedChat = (resp:{[key:string]:IeachChat[]},chats:{[key:string]:IeachChat[]}) => {
    let Paylaod = {...chats}
    Object.keys(resp).forEach(elm=>{
if (Object.keys(chats).includes(elm)) {
    Paylaod[elm]=[...Paylaod[elm],...resp[elm]]
}
else{
    Paylaod[elm]=resp[elm]
}
    })

 return Paylaod
}

export default OptimizedChat
