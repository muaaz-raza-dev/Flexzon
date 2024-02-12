import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Sparkle } from 'lucide-react'

const VerifiedBadge = () => {
  return (
    <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Sparkle size={14} fill='#FFDF00' strokeOpacity={.8} className=' '/>
      </TooltipTrigger>
      <TooltipContent>
        <p>Verified</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
  )
}

export default VerifiedBadge
