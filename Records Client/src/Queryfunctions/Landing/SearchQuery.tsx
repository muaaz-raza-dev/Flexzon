
import { Isearch } from "@/app/Types/Isearch"
import Axios from "../axios"

export const SearchQuery = async(q:string) => {

let response = await Axios.post<{payload:Isearch}>(`/search`,{q})
return response.data

}
