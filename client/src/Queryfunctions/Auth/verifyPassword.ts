import Cookies from "js-cookie"
import Axios from "../axios"

const DeleteAccount = async(password:string) => {
let response = await Axios.put("/auth/Delete",{password},{
    headers:{"auth-token":Cookies.get("Records_session")}
})
return response.data
}

export default DeleteAccount
