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

const useFavoritesMutation = () => {
  const mutation = useSWRMutation("/api/favorites", fetch);

  return mutation;
};

export default useFavoritesMutation;
