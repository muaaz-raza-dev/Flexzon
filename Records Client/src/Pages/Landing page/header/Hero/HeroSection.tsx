const HeroSection = () => {
  return (
 
<div className="relative heroShadow overflow-hidden before:absolute before:top-0 before:start-1/2 before:bg-[url('https://preline.co/assets/svg/examples/polygon-bg-element.svg')] before:bg-no-repeat before:bg-top before:bg-cover before:w-full before:h-full before:-z-[1] before:transform before:-translate-x-1/2 
dark:before:bg-[url('https://preline.co/assets/svg/examples-dark/polygon-bg-element.svg')]">
  <div className=" max-w-[85rem]  mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10">
    {/* <!-- Announcement Banner --> */}
    <div className="flex justify-center">
   
    </div>
    {/* <!-- End Announcement Banner --> */}

    {/* <!-- Title --> */}
    <div className="mt-5 max-w-2xl text-center mx-auto z-40">
      <h1 className="block font-bold text-gray-800 hFont text-4xl md:text-5xl lg:text-6xl dark:text-gray-200">
      Crafting Dreams into Words 
        <span className="bg-clip-text bg-gradient-to-tr from-[var(--primary)] to-violet-700 text-transparent"> Together</span>
      </h1>
    </div>
    {/* <!-- End Title --> */}

    <div className="mt-5 max-w-3xl text-center mx-auto z-40">
      <p className="md:text-lg max-md:text-md text-black "> Your flexible platform for sparking ideas, sharing blogs, and connecting with creators. Craft effortlessly and share seamlessly – your creative journey simplified.</p>
    </div>

    {/* <!-- Buttons --> */}
    <div className="mt-8 gap-3 flex justify-center z-40">
      <a className="inline-flex shadow text-xl px-6 justify-center items-center gap-x-3 text-center bg-[var(--primary)] border active:scale-95 transition-all border-transparent text-white  font-medium rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-600 py-3 dark:focus:ring-offset-gray-800" href="#">
       Start reading
      
      </a>
  
    </div>

  <div className="ocean">
  <div className="wave"></div>
</div>
  </div>
</div>
  )
}

export default HeroSection
