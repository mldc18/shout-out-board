import { Swiper, SwiperSlide } from "swiper/react";
import { wordsOfAppreciation } from "../definitions/words-of-appreciation";
import { Autoplay, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type ThankYouProps = {};

const ThankYou = (props: ThankYouProps) => {
  const wordsOfAppreciationArray = Object.keys(wordsOfAppreciation);

  const swiperSlides = wordsOfAppreciationArray.map((word, index) => (
    <SwiperSlide key={index}>
      {wordsOfAppreciation[word as keyof typeof wordsOfAppreciation]},
    </SwiperSlide>
  ));

  return (
    <div className="flex h-2/4">
      <Swiper
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        className="mySwiper h-full"
        direction={"vertical"}
        loop={true}
        modules={[Autoplay, Navigation]}
        pagination={{
          clickable: true,
        }}
      >
        {swiperSlides}
      </Swiper>
    </div>
  );
};

export default ThankYou;
