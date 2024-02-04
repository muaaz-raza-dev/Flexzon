import { Link } from "react-router-dom"

const ErrorPage = () => {
  return (
      <div className="min-w-screen min-h-screen bg-[var(--bg)] flex items-center p-5 lg:p-20 overflow-hidden relative">
    <div className="flex-1 min-h-full z-50 min-w-full rounded-3xl bg-white shadow-xl p-10 lg:p-20 text-gray-800 relative md:flex items-center text-center md:text-left">
        <div className="w-full md:w-1/2">
        <h1 className="hFont">Records</h1>
            <div className="mb-10 md:mb-20 text-gray-600 font-light">
                <h1 className="font-black hFont uppercase text-3xl lg:text-5xl text-[var(--primary)] mb-10">You seem to be lost!</h1>
                <p>The page you're looking for isn't available.</p>
                <p>Try searching again or use the Go Back button below.</p>
            </div>
            <div className="mb-20 md:mb-0">
                <Link to={"/"} className="text-lg font-light outline-none focus:outline-none transform transition-all primary p-2 px-4 rounded text-white hover:scale-95 ">Go Back</Link>
            </div>
        </div>
    <div className="md:w-1/2">
        <img src="/images/404.png" alt="" />
    </div>
       
    </div>
    <div className="w-64 md:w-96 h-96 md:h-full bg-[var(--primary)] bg-opacity-30 absolute -top-64 md:-top-96 right-20 md:right-32 rounded-full pointer-events-none -rotate-45 transform"></div>
    <div className="w-96 h-full bg-[var(--secondary)] bg-opacity-20 absolute -bottom-96 right-64 rounded-full pointer-events-none -rotate-45 transform"></div>
</div>
  )
}

export default ErrorPage
