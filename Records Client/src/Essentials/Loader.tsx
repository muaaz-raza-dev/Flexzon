import { ring } from 'ldrs'
import { useEffect } from 'react';
import { bouncy } from 'ldrs'

// Default values shown  
const Loader = () => {
    useEffect(() => {
        ring.register()
    }, []);
  return (
    <div className="relative ">

    <div className='w-full bg-red-400 absolute top-0 flex items-center justify-center'>

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



export const RecordsLoader=()=>{
  useEffect(() => {

bouncy.register()

}, []);
  return(
  <div className="center w-screen h-screen">
    <l-bouncy
    size="105"
    speed="1.75"
    color="#161A30" 
></l-bouncy>
    </div>
    )
}
export default Loader
