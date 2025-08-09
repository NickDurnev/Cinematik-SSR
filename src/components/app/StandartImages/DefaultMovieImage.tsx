import Movie404Icon from "/icons/Movie404.svg";

const DefaultMovieImage = () => (
  <div className="flex h-full w-full items-center justify-center rounded-tl-[10px] rounded-tr-[10px] bg-[#666666] text-[var(--color-link)]">
    <Movie404Icon className="h-auto w-[120px] stroke-current" />
  </div>
);

export default DefaultMovieImage;
