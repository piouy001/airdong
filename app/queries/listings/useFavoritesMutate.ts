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
) => axios.post(`${url}/${arg.listingId}`);

const useFavoritesMutate = () => {
  const mutate = useSWRMutation("/api/favorites", fetch);

  return mutate;
};

export default useFavoritesMutate;
