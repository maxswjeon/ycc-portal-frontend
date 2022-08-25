import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { QUERY_AUTH_STATE } from "constants/query";
import { SessionResponse } from "types/Responses";

const useAuthState = () => {
  return useQuery<SessionResponse>(
    [QUERY_AUTH_STATE],
    async () => {
      const { data } = await axios.get<SessionResponse>(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/session",
        { withCredentials: true }
      );
      return data;
    },
    { cacheTime: 0 }
  );
};

export default useAuthState;
