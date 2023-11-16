import axios from "axios";
import useSWRMutation from "swr/mutation";

import { CountryType } from "hooks/useCountries";

const create = (
  url: string,
  {
    arg,
  }: {
    arg: {
      category: string;
      location: CountryType | null;
      guestCount: number;
      roomCount: number;
      bathroomCount: number;
      imageSrc: string;
      price: number;
      title: string;
      description: string;
    };
  },
) => axios.post(url, arg);

const useListingsMutation = () => {
  const mutation = useSWRMutation("/api/listings", create);

  return mutation;
};

export default useListingsMutation;
