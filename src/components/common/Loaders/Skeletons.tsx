const SkeletonWrap = () => (
  <div className="flex w-full flex-col items-center">
    <div className="h-[465px] w-[310px] animate-pulse rounded-md bg-bg-icon" />
    <div className="mt-2 h-[30px] w-[310px] animate-pulse rounded-md bg-bg-icon" />
  </div>
);

export const GallerySkeleton = () => {
  return (
    <div className="mx-auto block w-full items-stretch justify-items-center gap-5 space-y-5 md:grid md:grid-cols-2 md:space-y-0 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {Array.from({ length: 20 }).map((_, index) => (
        <SkeletonWrap key={index} />
      ))}
    </div>
  );
};
