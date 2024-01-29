import { Ilogin} from "@/app/Types/IAuth"
import Axios from "../axios"

const Login = async({ username,password}:Ilogin) => {
let response = await Axios.post("/auth/login",{  username,  password })
return response.data
}

export default Login
