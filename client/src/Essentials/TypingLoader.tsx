import { dotPulse } from 'ldrs'
import { useEffect } from 'react';
const TypingLoader = () => {
useEffect(() => {
    dotPulse.register()
}, []);

// Default values shown
  return (
    <div>
<l-dot-pulse
  size="43"
  speed="1.3" 
  color="black" 
></l-dot-pulse>
    </div>
  )
}

export default TypingLoader
