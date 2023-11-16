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

const useDeleteFavoritesMutation = () => {
  const mutation = useSWRMutation("/api/favorites", fetch);

  return mutation;
};

export default useDeleteFavoritesMutation;
