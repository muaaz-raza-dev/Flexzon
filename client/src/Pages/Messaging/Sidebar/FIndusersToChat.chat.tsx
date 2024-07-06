import { useEffect, useState } from 'react';

// @ts-ignore
import { useDebouncedCallback } from 'use-debounce';
const FIndusersToChat = ({mutate}:{mutate:any}) => {
  const [Input, setInput] = useState<string>("");
  useEffect(() => {
    debounced(Input)
  }, [Input]);
  const debounced = useDebouncedCallback(
    // function
    (value:string)=>{
      if (Input&&value) {
   
          mutate(value)
        
      }
    },
    // delay in ms
    1000
  );
  return (
    <>
    
    <input placeholder="Search people by username" onChange={(e)=>setInput(e.target.value)} value={Input} className="w-full p-2 border-none outline-none"/>
    </>
  
    
  )
}

export default FIndusersToChat
