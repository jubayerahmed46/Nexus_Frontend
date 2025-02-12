import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "./styles.css";

import { Navigation, Autoplay } from "swiper/modules";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import FilledBtn from "../../../../components/buttons/FilledBtn";
import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router";

export default function Banner() {
  const axiosSecure = useAxiosSecure();
  const [activeIndex, setActiveIndex] = useState(0);

  const { data: popularArticles = [] } = useQuery({
    queryKey: ["popularArticles"],
    queryFn: async () => {
      const { data } = await axiosSecure(`/api/articles/popular`);
      return data;
    },
  });

  // Duplicate slides if there are too few for loop
  const slides =
    popularArticles.length < 3
      ? [...popularArticles, ...popularArticles]
      : popularArticles;

  return (
    <div className="p-5 xl:h-[550px] w-full md:h-[500px] h-[560px]">
      <Swiper
        slidesPerView={1} // Ensure compatibility with the number of slides
        loop={slides.length > 1} // Enable loop only if there are enough slides
        navigation={true}
        autoplay={{ delay: 5000 }}
        modules={[Navigation, Autoplay]}
        className="mySwiper"
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        speed={1400}
      >
        {slides.map((art, i) => (
          <SwiperSlide key={i}>
            <motion.div
              className="relative h-full w-full object-cover"
              style={{ backgroundImage: `url('${art.thumbnail}')` }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ opacity: { duration: 2, ease: "easeOut" } }}
            >
              <div className="bg-black/40 w-full h-full md:px-32 p-10 flex flex-col justify-center items-center">
                <motion.h1
                  key={activeIndex}
                  className="text-white md:text-5xl text-3xl font-medium mb-2 uppercase"
                  initial={{ opacity: 0, x: "40%" }}
                  animate={{ opacity: 1, x: "0%" }}
                  transition={{ duration: 2, ease: "easeOut" }}
                >
                  {art?.title?.slice(0, 20)}
                </motion.h1>
                <motion.h2
                  key={`desc-${activeIndex}`}
                  className="text-white md:text-lg text-base drop-shadow-2xl mb-2"
                  initial={{ opacity: 0, x: "40%" }}
                  animate={{ opacity: 1, x: "0%" }}
                  transition={{
                    duration: 2,
                    ease: "easeOut",
                    delay: 0.2,
                  }}
                >
                  {art?.description?.slice(0, 200)}
                </motion.h2>
                <Link to={`all-articles/details/${art._id}`}>
                  <FilledBtn className="bg-myGreen text-white border-b-2 mt-8 w-[200px] py-3 hover:bg-black2 hover:border-myGreen border-black1">
                    Explore
                  </FilledBtn>
                </Link>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
