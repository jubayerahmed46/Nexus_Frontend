import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

function useUserInfo() {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data, isLoading } = useQuery({
    queryKey: [user.email],
    enabled: !loading,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/api/users/user/${user.email}`);
      return data;
    },
  });
  return { userInfo: data, isLoading };
}

export default useUserInfo;
