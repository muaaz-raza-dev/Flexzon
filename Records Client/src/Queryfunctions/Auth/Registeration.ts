import { Iregister } from "@/app/Types/IAuth"
import Axios from "../axios"

const Registeration = async({ Name, username, bio, email, password, avatar,Topics}:Iregister) => {
let response = await Axios.post("/auth/register",{ Name, username, bio, email, password, avatar,Topics})
return response.data
}

export default Registeration
