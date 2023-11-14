import axios from "axios";
import useSWRMutation from "swr/mutation";

const signUp = (url: string, { arg }: { arg: { email: string; name: string; password: string } }) =>
  axios.post(url, arg);

const useSignUpMutate = () => {
  const mutate = useSWRMutation("/api/signUp", signUp);

  return mutate;
};

export default useSignUpMutate;
