import WordPullUp from '@/components/magicui/word-pull-up'
import { useEffect, useState } from 'react'
const HeroTitle = () => {
  const [Word, setWord] = useState<string>("")
  useEffect(() => {
  setWord(RandomWord(["Dream " ,"Innovations" ,"Creativity" , "Ideas" ,"Thoughts" ]))
  }, [])
  const RandomWord = (arr:string[])=> {
    let index = Math.floor(Math.random() * arr.length)
    return arr[index]
  }
  return (
    <div className="mt-5 md:min-w-4xl max-md:max-w-4xl md:text-center max-md:text-left  mx-auto z-40">
    <div className="relative flex md:items-center max-md:justify-start max-md:flex-wrap max-md:gap-2 justify-center  w-4xl font-bold text-gray-800 hFont text-6xl md:!text-8xl max-md:text-6xl dark:text-gray-200">
  <h1 className="block font-bold text-gray-800 hFont md:!text-8xl  max-md:text-6xl lg:text-6xl dark:text-gray-200">
  Share your
  </h1>
      <div className="min-w-[20%] md:mx-4 flex gap-2">
        <WordPullUp words={Word} className='md!text-8xl max-md:text-6xl items-start'/>
      </div>
    </div>
      
  <h1 className="block font-bold text-gray-800 hFont  md:!text-8xl max-md:text-6xl lg:text-6xl dark:text-gray-200">
  to World 
<span className="bg-clip-text bg-gradient-to-tr from-[var(--primary)] to-violet-700 text-transparent"> Anonymously. </span>
    </h1>
</div>
  )
}

export default HeroTitle