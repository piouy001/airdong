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

const useListingsMutate = () => {
  const mutate = useSWRMutation("/api/listings", create);

  return mutate;
};

export default useListingsMutate;
