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

const useReservationMutation = () => {
  const mutation = useSWRMutation("/api/reservations", fetch);

  return mutation;
};

export default useReservationMutation;
