import { Clover} from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
const RestrictionIcon:React.FC<{Info:boolean}> = ({Info}) => {
    if (Info) {
        return (
            <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
    <Clover   color="gray" size={20}/> 
      </TooltipTrigger>
      <TooltipContent>
        <p>{Info?"Blog is restricred for only followers , Follow to access blog":"fasdf"}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
  )
}
}

export default RestrictionIcon
