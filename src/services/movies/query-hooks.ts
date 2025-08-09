import { useQuery } from "@tanstack/react-query";

import { movieCast } from "@/services/movies/service";

export const useMovieCast = ({ movieId }: { movieId: string }) =>
  useQuery({
    queryKey: ["movieCast", { movieId }],
    queryFn: () => movieCast({ movieId }),
    enabled: Boolean(movieId),
  });
