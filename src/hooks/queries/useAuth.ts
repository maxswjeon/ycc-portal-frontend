import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { QUERY_AUTH_STATE } from "./../../constants/query";
import { SessionResponse } from "./../../types/Responses";

const useAuth = () => {
  const { data, isLoading, error } = useQuery(
    [QUERY_AUTH_STATE],
    async () => {
      const { data } = await axios.get<SessionResponse>(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/session",
        { withCredentials: true }
      );

      if (!data.result) {
        return false;
      }

      return data.status;
    },
    { cacheTime: 0 }
  );

  if (isLoading) {
    return null;
  }

  if (error) {
    return false;
  }

  return !!data;
};

export default useAuth;
