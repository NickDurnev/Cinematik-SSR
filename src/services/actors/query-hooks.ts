import { useQuery } from "@tanstack/react-query";

import { actorDetails } from "@/services/actors/service";

export const useActorDetails = ({ actorId }: { actorId: string }) =>
  useQuery({
    queryKey: ["actor-details", { actorId }],
    queryFn: () => actorDetails({ actorId }),
  });
