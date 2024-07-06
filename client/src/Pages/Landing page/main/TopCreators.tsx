import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useAppSelector } from "@/app/ReduxHooks";
import { FC } from "react";
import { ItopCreators } from "@/app/Types/Ilanding";
import { Link } from "react-router-dom";

const TopCreators = () => {
  let TopCreators = useAppSelector((state) => state.landing).TopCreators;

  return (
    <div className="w-full h-full rounded ">
      <h1 className=" max-md:flex my-3  text-xl hFont font-bold items-center flex gap-x-2">
        Top Creators
      </h1>
      <div className="flex flex-col gap-3">
        {TopCreators.map((elm) => <EachCreatorComponent data={elm} key={elm?._id} />)}
      </div>
      <div className="center mt-4">
    <div className="w-[80%] h-[1px] bg-gray-200"></div>
    </div>
    </div>
  );
};

const EachCreatorComponent: FC<{ data: ItopCreators }> = ({ data }) => {
  return (
    <div className=" w-full ">
      <Link
        to={`/user/${data?._id}`}
        className="w-full h-[4rem] pb-1 flex  flex-col rounded-md   text-black" >
        <div className="flex px-2  justify-center items-center gap-x-2 h-full">
          <div className="flex items-start h-full w-[80%] gap-x-2">
            <img src={data?.avatar || "/images/muaaz.png"}
              className=" w-6 h-6  rounded-full aspect-square my-1  object-cover bg-black " />
            <div className="">
              <h1 className="md:text-xl max-md:text-md font-semibold hFont ">
                {data?.Name}
              </h1>
              <p className="text-sm font-bold w-full text-gray-600">
                {data?.bio.slice(0,80)  } ...
              </p>
            </div>

          </div>
          <button className="   text-black  rounded w-[20%] gap-x-2 flex items-center  h-full">
            <Link to={`/user/${data?._id}`} className="flex bg-[var(--primary)] text-white center w-full py-1   gap-x-2 rounded-lg  ">
            Follow
            </Link>
          </button>
        </div>
      </Link>
    </div>
  );
};
export default TopCreators;
