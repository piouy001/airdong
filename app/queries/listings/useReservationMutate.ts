import axios from "axios";
import useSWRMutation from "swr/mutation";

const fetch = (
  url: string,
  {
    arg,
  }: {
    arg: {
      totalPrice: number;
      startDate: Date;
      endDate: Date;
      listingId: string;
    };
  },
) => axios.post(url, arg);

const useReservationMutate = () => {
  const mutate = useSWRMutation("/api/reservations", fetch);

  return mutate;
};

export default useReservationMutate;
