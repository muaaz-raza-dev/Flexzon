import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/app/ReduxHooks";
import { FC } from "react";
import { ItopCreators } from "@/app/Types/Ilanding";
import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp } from "lucide-react";
const TopCreators = () => {
  let TopCreators= useAppSelector(state=>state.landing).TopCreators
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToScroll:1,
    initialSlide: 0,
    slidesPerRow:3,
    autoplay:true
    ,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
    slidesPerRow:3,
    autoplay:false
        }
      },
      {
        breakpoint: 600,
        settings: {
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          slidesPerRow:2,
          autoplay:false
        }
      },
      {
        infinite: true,
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          slidesPerRow:2,
          autoplay:false
        }
      }
    ]
  };
  return (
      <div className="w-full h-full rounded px-1">
        <h1 className="px-2 max-md:flex my-2 md:hidden text-xl hFont items-center flex gap-x-2">Top Writers <TrendingUp size={16}/> </h1>
      <Slider {...settings} arrows={true} slidesPerRow={
        3
      } slidesToShow={1}   touchMove   autoplay={true} className="lg:w-full max-lg:w-[98vw]  " >
        {
          TopCreators.map(elm=>
            {
              return <div key={elm?._id||""} className="">
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
      
      <div className="p-1 w-full ">
        <Link  to={`/user/${data?._id}`} className="w-full CreatorsShadow  max-h-[12rem] pb-1 flex  flex-col rounded-md items-center  text-black">

            <div  className="flex center gap-x-4">
    <img src={data?.avatar||"/images/muaaz.png"} className="w-[20%]  rounded-full aspect-square my-1  object-cover  bg-[#ffffff57]"/>

<div className="">

            <h1 className="md:text-xl max-md:text-lg font-semibold hFont ">{data?.Name}</h1>
            <p className="text-xs font-bold">{data?.followers?.length} Followers 
            . {data?.posts} Posts 
            </p>
</div>
            <Button className="  text-black    rounded gap-x-2">
            <Link  to={`/user/${data?._id}`} className="flex w-full   gap-x-2 ">
        <ArrowRight/>
            </Link>
            </Button>
            </div>
        </Link>
          </div>
       
    )
}
export default TopCreators
