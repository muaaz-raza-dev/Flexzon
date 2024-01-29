import { ring } from 'ldrs'
import { useEffect } from 'react';

const Loader = () => {
    useEffect(() => {
        ring.register()
    }, []);
  return (
    <div className="relative">

    <div className='w-full absolute top-0 flex items-center justify-center'>

<l-ring
  size="20"
  stroke="3"
  bg-opacity="0"
  speed="2" 
  color="black" 
></l-ring>
      
  </div>
    </div>
  )
}


export const SmallLoader = () => {
    useEffect(() => {
        ring.register()
    }, []);
  return (


    <div className='w-full  flex items-center justify-center'>

<l-ring
  size="20"
  stroke="3"
  bg-opacity="0"
  speed="2" 
  color="black" 
></l-ring>
      

    </div>
  )
}

export const LightLoader = () => {
  useEffect(() => {
      ring.register()
  }, []);
return (


  <div className='w-full  flex items-center justify-center'>

<l-ring
size="20"
stroke="3"
bg-opacity="0"
speed="2" 
color="white" 
></l-ring>
    

  </div>
)
}
export default Loader
