import { Imessaging } from '@/app/Types/Imessaging'

const ReturnAllChatsId = <T>(ChatState:Imessaging<T>) => {
    let ChatIds:string[]=[]
ChatState.chats.forEach(elm=>{
    ChatIds.push(elm._id)
}) 
ChatState.Invites.forEach(elm=>{
    ChatIds.push(elm.ChatId._id)
}) 
return [...new Set(ChatIds)]
}

export default ReturnAllChatsId
