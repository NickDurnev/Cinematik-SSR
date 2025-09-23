import Image from "next/image";
import { A11y, Autoplay, Navigation } from "swiper/modules";
import { Swiper as SwiperComponent, SwiperSlide } from "swiper/react";

import { IMovie } from "@/types/movie";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

import { CustomLink, Spinner } from "@/components/common";

import MovieCard from "./movies/MovieCard";

interface IProps {
  movies: IMovie[];
  onAutoPlay?: boolean;
  onReachEnd?: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
}

export const Swiper = ({
  movies,
  onAutoPlay = false,
  onReachEnd,
  hasNextPage = false,
  isFetchingNextPage = false,
}: IProps) => {
  const autoplaySettings = onAutoPlay ? { delay: 5000 } : { delay: 2000000 };

  const handleReachEnd = () => {
    console.log("🚀 ~ handleReachEnd:", handleReachEnd);

    if (hasNextPage && !isFetchingNextPage && onReachEnd) {
      onReachEnd();
    }
  };

  return (
    <div className="relative">
      <SwiperComponent
        modules={[Navigation, A11y, Autoplay]}
        spaceBetween={10}
        slidesPerView={1}
        breakpoints={{
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
          1440: {
            slidesPerView: 4,
          },
          1920: {
            slidesPerView: 5,
          },
          2560: {
            slidesPerView: 6,
          },
        }}
        navigation={{
          prevEl: ".prev",
          nextEl: ".next",
        }}
        autoplay={{ ...autoplaySettings }}
        onReachEnd={handleReachEnd}
        className="swiper-container relative"
      >
        <div className="prev -translate-y-1/2 absolute top-[40%] left-0 z-[2] cursor-pointer xl:top-[45%]">
          <Image
            src={"/icons/ArrowLeft.svg"}
            alt={"Arrow Left"}
            width={60}
            height={60}
          />
        </div>
        {movies.map(movie => (
          <SwiperSlide key={movie.id}>
            <CustomLink href={`/movies/${movie.id}`}>
              <MovieCard movie={movie} />
            </CustomLink>
          </SwiperSlide>
        ))}
        {isFetchingNextPage && (
          <SwiperSlide>
            <div className="flex h-full min-h-[200px] items-center justify-center">
              <Spinner />
            </div>
          </SwiperSlide>
        )}
        <div className="next -translate-y-1/2 absolute top-[40%] right-0 z-[2] cursor-pointer xl:top-[45%] xl:right-[15px]">
          <Image
            src={"/icons/ArrowRight.svg"}
            alt={"Arrow Right"}
            width={60}
            height={60}
          />
        </div>
      </SwiperComponent>
    </div>
  );
};
