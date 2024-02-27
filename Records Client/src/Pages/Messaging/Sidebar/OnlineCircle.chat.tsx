import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"


const OnlineCircle = () => {
    return  <TooltipProvider>

    <Tooltip>
<TooltipTrigger className="absolute bottom-0 right-0 w-2 h-2 rounded-full border bg-green-500">
  
</TooltipTrigger>
<TooltipContent>
   online
</TooltipContent>
    </Tooltip>
    </TooltipProvider>
}

export default OnlineCircle
