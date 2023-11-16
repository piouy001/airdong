import axios from "axios";
import useSWRMutation from "swr/mutation";

const fetch = (
  url: string,
  {
    arg,
  }: {
    arg: {
      listingId: string;
    };
  },
) => axios.delete(`${url}/${arg.listingId}`);

const useUnFavoritesMutate = () => {
  const mutate = useSWRMutation("/api/favorites", fetch);

  return mutate;
};

export default useUnFavoritesMutate;
