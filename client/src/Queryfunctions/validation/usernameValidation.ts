import Axios from "../axios"

const usernameValidation = async(input:string) => {
let response = await Axios.post("/auth/verifyUsername",{username:input})
return response.data
}

export default usernameValidation
