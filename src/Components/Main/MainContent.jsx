// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import mockData from "../../resources/mockData.json";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "../../styles/swiper.css";

// import required modules
import { Autoplay, FreeMode, Navigation, Pagination } from "swiper/modules";
import { useEffect, useState } from "react";

export const Slider = ({ content }) => {
  const [isHovered, setIsHoverd] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [, setContentList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setTimeout(async () => {
          const data = mockData;
          setContentList(data);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error("에러 발생", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div
      className="slider w-full h-full object-cover relative font-pretendard"
      onMouseOver={() => !isLoading && setIsHoverd(true)}
      onMouseLeave={() => !isLoading && setIsHoverd(false)}
    >
      {isLoading ? (
        <div
          role="status"
          className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center"
        >
          <div className="flex items-center justify-center w-full h-[430px] bg-zinc-500 rounded sm:w-96 dark:bg-gray-700"></div>
        </div>
      ) : (
        <img src={content.Images[0]} alt={content.Title} />
      )}

      {isHovered && (
        <div
          className={`additional_info w-full h-full absolute top-0 left-0 right-0 bottom-0 bg-zinc-800 text-white flex flex-col items-center justify-center bg-opacity-60 px-6 transition-opacity duration-300 ease-in-out opacity-0 hover:opacity-100 rounded-lg border-solid border-2 border-emerald-500`}
        >
          <h3>{content.Title}</h3>
          <p>평점: {content.imdbRating}</p>
          <span>개봉일: {content.Released}</span>
          <span>{content.Runtime}</span>
        </div>
      )}
    </div>
  );
};

export default function MainContent() {
  const contents = mockData;

  // 마우스 오버 시, 슬라이드 정지
  const [swiper, setSwiper] = useState(null);
  const toggleSlideAutoplay = (index, play) => {
    if (swiper && swiper.autoplay) {
      // const slideIndex = index;
      const isAutoplay = play;

      swiper.autoplay[isAutoplay ? "start" : "stop"]();
    }
  };

  return (
    <>
      <Swiper
        onSwiper={setSwiper}
        breakpoints={{
          640: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            pagination: {
              clickable: false,
            },
          },
          876: {
            slidesPerView: 3,
            slidesPerGroup: 3,
            pagination: {
              clickable: false,
            },
          },
          1080: {
            slidesPerView: 4,
            slidesPerGroup: 2,
            pagination: {
              clickable: true,
            },
          },
        }}
        slidesPerView={1}
        spaceBetween={30}
        freeMode={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[FreeMode, Pagination, Autoplay, Navigation]}
        className="mySwiper font-pretendard"
      >
        {contents.map((content, index) => (
          <SwiperSlide
            key={index}
            onMouseOver={() => toggleSlideAutoplay(index, false)}
            onMouseLeave={() => toggleSlideAutoplay(index, true)}
          >
            <Link to="/contentDetail" className="w-full h-full flex items-center justify-center">
              <Slider content={content} />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
