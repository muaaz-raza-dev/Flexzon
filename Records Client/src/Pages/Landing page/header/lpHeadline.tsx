import RadialGradient from '@/components/magicui/radial-gradient'
import { Link } from 'react-router-dom'

const Headline = () => {
  return (
    <div className="relative bg-gradient-to-bl from-[var(--primary)] to-[var(--secondary)] p-8 mx-2 mt-1 rounded-lg shadow-lg text-center overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-purple-900 opacity-30"></div>
    <h1 className="text-5xl font-extrabold text-white my-4 relative z-10">Hey there, Welcome back!</h1>
    <p className=" text-white mb-6 relative z-10">Be among the first to explore and contribute to our vibrant community. Share your stories, insights, and connect with like-minded individuals.</p>
    <Link to="/write" className="inline-block bg-white text-[var(--primary)] font-bold py-3 px-6 rounded-lg hover:bg-purple-100 relative z-10">
    Write a New Post
    </Link>
    <RadialGradient  from='#31304D' origin='right' to='#161A30' type='ellipse'/>
</div>

  )
}

export default Headline