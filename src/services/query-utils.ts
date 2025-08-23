import { QueryClient } from "@tanstack/react-query";

import { ILibraryMovie, ILibraryMoviePartial } from "@/types/library";
import { IReview } from "@/types/review";

type DataType = {
  data: ILibraryMovie[] | ILibraryMoviePartial[] | IReview[];
};

type NewDataType = ILibraryMovie | ILibraryMoviePartial | IReview;

export const processAddQueryData = <T extends DataType>(
  queryClient: QueryClient,
  queryKey: string[],
  newData: NewDataType,
) => {
  queryClient.setQueryData(queryKey, (oldData: T) => {
    if (!oldData) {
      return { data: [newData] } as T;
    }
    return { ...oldData, data: [newData, ...oldData.data] };
  });
};

export const processUpdateQueryData = <T extends DataType>(
  queryClient: QueryClient,
  queryKey: string[],
  newData: NewDataType,
) => {
  queryClient.setQueryData(queryKey, (oldData: T) => {
    if (!oldData) {
      return { data: [newData] } as T;
    }
    return {
      ...oldData,
      data: [newData, ...oldData.data.filter(item => item.id !== newData.id)],
    };
  });
};

export const processDeleteQueryData = <T extends DataType>(
  queryClient: QueryClient,
  queryKey: string[],
  newData: NewDataType,
) => {
  queryClient.setQueryData(queryKey, (oldData: T) => {
    if (!oldData) {
      return { data: [] };
    }
    return {
      ...oldData,
      data: oldData.data.filter(review => review.id !== newData.id),
    };
  });
};
