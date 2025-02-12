import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoIosAddCircleOutline } from "react-icons/io";
import ReviewSlider from "./ReviewSlider";
import { Link } from "react-router";
import ReviewModal from "./ReviewModal";
import useAuth from "../../../../hooks/useAuth";
import FilledBtn from "../../../../components/buttons/FilledBtn";
import Heading from "../../../../components/Heading";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";

export default function Reviews() {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const {
    data: reviews = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/api/reviews`);
      return data;
    },
  });

  if (isLoading) return <h2 className="text-2xl">Loading...</h2>;

  return (
    <div className="container mx-auto  ">
      <Heading title="What People say About Our features" />
      <div className="border rounded-md px-2 shadow-sm py-5 bg-white mt-5">
        <ReviewSlider reviews={reviews} />
        <div className="flex justify-center gap-5 mt-10">
          {user ? (
            <FilledBtn className="rounded-md cursor-pointer flex   justify-center  bg-myGreen px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-myGreen/85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mygbg-myGreen">
              <label
                htmlFor="my_modal_6"
                className="cursor-pointer flex items-center gap-2"
              >
                Add Review <IoIosAddCircleOutline />
              </label>
            </FilledBtn>
          ) : (
            <Link to={"auth/login"}>
              <FilledBtn className="rounded-none cursor-pointer flex w-full justify-center  bg-myGreen px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-myGreen/85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mygbg-myGreen">
                Add Review <IoIosAddCircleOutline />
              </FilledBtn>
            </Link>
          )}
        </div>
      </div>
      <ReviewModal refetch={refetch} />
    </div>
  );
}
