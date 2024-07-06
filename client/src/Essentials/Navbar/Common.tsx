import { Home, TrendingUp } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const Common = () => {
    let route  = useLocation().pathname
  return (
    <>
    <Link to="/"  className={`relative text-gray-600 p-2 rounded hover:text-[var(--primary)] transition-colors cursor-pointer font-normal flex items-center center gap-x-1   ${route=="/"&&"bg-[var(--secondary)] text-white hover:text-white"}`} >
    <Home size={20}/>
    </Link>
    <Link to="/recommendations"  className={`relative text-gray-600 p-2 rounded hover:text-[var(--primary)] transition-colors cursor-pointer  md:hidden max-md:visible font-normal flex items-center center gap-x-1   ${route.split("/")[1]=="recommendations"&&"bg-[var(--secondary)] text-white hover:text-white"}`}>
    <TrendingUp size={20}/>
  
    </Link>
    </>
  )
}

export default Common