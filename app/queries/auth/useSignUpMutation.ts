import axios from "axios";
import useSWRMutation from "swr/mutation";

const signUp = (url: string, { arg }: { arg: { email: string; name: string; password: string } }) =>
  axios.post(url, arg);

const useSignUpMutation = () => {
  const mutation = useSWRMutation("/api/signUp", signUp);

  return mutation;
};

export default useSignUpMutation;
