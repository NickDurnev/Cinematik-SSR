import { CustomLink } from "@/components/common";

interface IProps {
  movieId: string;
}

export const MovieCategories = ({ movieId }: IProps) => {
  const categories = [
    { name: "Cast", path: `/movies/${movieId}/cast` },
    { name: "Reviews", path: `/movies/${movieId}/reviews` },
    { name: "Similar Movies", path: `/movies/${movieId}/similar_movies` },
  ];

  return (
    <ul className="mx-auto my-[50px] flex w-[90%] items-center justify-between md:my-[100px] md:w-[90%] xl:w-[950px]">
      {categories.map(({ name, path }) => (
        <li key={name} className="flex">
          <CustomLink
            href={path}
            className="rounded-[5px] bg-inherit px-[5px] font-technovier text-[15px] text-add-bg-element uppercase leading-[17px] transition-all duration-theme-hover-transition ease-theme-hover-time-function visited:text-foreground hover:text-foreground focus:text-foreground md:text-[18px] md:leading-[21px]"
          >
            {name}
          </CustomLink>
        </li>
      ))}
    </ul>
  );
};
