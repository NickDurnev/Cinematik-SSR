interface IProps {
  youtubeURL: string;
  movieTrailer: string;
}

export const Frame = ({ youtubeURL, movieTrailer }: IProps) => {
  return (
    <iframe
      className="h-[230px] tablet:h-[400px] tablet:w-[600px] w-[360px] rounded-[5px] border-0"
      src={`${youtubeURL}${movieTrailer}?autoplay=0&mute=0&controls=1`}
      title="video"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );
};
