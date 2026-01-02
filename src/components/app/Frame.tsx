interface IProps {
  youtubeURL: string;
  movieTrailer: string;
}

export const Frame = ({ youtubeURL, movieTrailer }: IProps) => {
  const origin = typeof window !== "undefined" ? window.location.origin : "";

  return (
    <iframe
      className="desktop:h-[675px] h-[200px] laptop:h-[450px] laptopL:h-[560px] tablet:h-[340px] desktop:w-[1200px] laptop:w-[800px] laptopL:w-[1000px] tablet:w-[600px] w-[360px] rounded-[5px] border-0"
      src={`${youtubeURL}${movieTrailer}?autoplay=0&mute=0&controls=1&origin=${origin}&rel=0`}
      title="video"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    />
  );
};
