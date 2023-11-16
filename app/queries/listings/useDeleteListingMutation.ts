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

const useDeleteListingMutation = () => {
  const mutation = useSWRMutation("/api/listings", fetch);

  return mutation;
};

export default useDeleteListingMutation;
