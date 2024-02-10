import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/app/ReduxHooks";
import { FC } from "react";
import { ItopCreators } from "@/app/Types/Ilanding";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
const TopCreators = () => {
  let TopCreators= useAppSelector(state=>state.landing).TopCreators
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToScroll:1,
    initialSlide: 0,
    slidesPerRow:3
    ,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
    slidesPerRow:3
        }
      },
      {
        breakpoint: 600,
        settings: {
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          slidesPerRow:2
        }
      },
      {
        infinite: true,
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          slidesPerRow:2

        }
      }
    ]
  };
  return (
      <div className="w-full h-full  border rounded md:p-4">
        <h1 className="px-2 text-2xl hFont ">Top Writers this week</h1>
      <Slider {...settings} arrows={true} slidesPerRow={
        3
      } slidesToShow={1}   touchMove   autoplay={true} className="lg:w-full max-lg:w-[98vw]  " >
        {
          TopCreators.map(elm=>
            {
              return <div key={elm?._id||""} className=" ">
              <EachCreatorComponent data={elm}/>
               </div>
            })
        }
      
    </Slider>
    </div>
  )
}

const EachCreatorComponent:FC<{data:ItopCreators}> =({data})=>{
    return (
      
      <div className="p-2">
        <div className="w-full rounded  max-h-[17rem] pb-2 flex gap-y-2 flex-col border-2 border-black items-center  text-black">

            <div   className="h-[50%] bg-[var(--secondary)] overflow-hidden object-contain w-full center  aspect-square">
    <img src={data?.avatar||"/images/muaaz.png"} className="w-[85%] rounded h-[90%] p-2  object-contain border bg-[#ffffff57]"/>
            </div>
            <div  className="">

            <h1 className="text-xl font-semibold hFont text-center">{data?.Name}</h1>
            <p className="text-xs font-bold">{data?.followers?.length} Followers 
            . {data?.posts} Posts 
            </p>
            </div>
            <Button className="w-[96%] py-2  px-4 hover:bg-[var(--primary)] bg-[var(--primary)] rounded-full gap-x-2">
            <Link  to={`/user/${data?._id}`} className="flex w-full px-4 py-2 gap-x-2 center">
              Visit profile 
              <ArrowRight size={16}/>
            </Link>
            </Button>
        </div>
          </div>
       
    )
}
export default TopCreators
