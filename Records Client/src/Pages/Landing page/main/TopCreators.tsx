import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/app/ReduxHooks";
import { FC } from "react";
import { ItopCreators } from "@/app/Types/Ilanding";
import { Link } from "react-router-dom";
const TopCreators = () => {
  let TopCreators= useAppSelector(state=>state.landing).TopCreators
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      };
  return (
      <div className=" w-full h-max   border p-2 rounded">
        <h1 className="hFont my-2 text-2xl ">Today's top creator</h1>
      <Slider {...settings} arrows={false} slidesPerRow={3} touchMove   autoplay={false} className="w-full " >
        {
          TopCreators.map(elm=>
            {
              return <div key={elm._id} className="w-1/2 ">
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
     
        <div className="w-full  max-h-[17rem] p-1 flex gap-y-2 flex-col border border-black items-center  text-black">
            <Link  to={`/user/${data._id}`} className="h-[50%] bg-[var(--secondary)] overflow-hidden object-contain w-full center  aspect-square">
    <img src={data.avatar||"/images/muaaz.png"} className="w-[45%] rounded h-[90%] p-2  object-contain border bg-[#ffffff57]"/>
            </Link>
            <Link to={`/user/${data._id}`} className="">

            <h1 className="hFont font-semibold text-xl">{data.Name}</h1>
            <p className="text-xs font-bold">{data.followers.length} Followers 
            . {data.posts} Posts 
            </p>
            </Link>
            <Button className="w-full py-2 px-4 hover:bg-[var(--primary)] bg-[var(--primary)] rounded-full">
            Follow
            </Button>
        </div>
       
    )
}
export default TopCreators
