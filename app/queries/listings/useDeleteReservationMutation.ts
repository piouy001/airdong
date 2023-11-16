import axios from "axios";
import useSWRMutation from "swr/mutation";

const fetch = (
  url: string,
  {
    arg,
  }: {
    arg: {
      reservationId: string;
    };
  },
) => axios.delete(`${url}/${arg.reservationId}`);

const useDeleteReservationMutation = () => {
  const mutation = useSWRMutation("/api/reservations", fetch);

  return mutation;
};

export default useDeleteReservationMutation;
