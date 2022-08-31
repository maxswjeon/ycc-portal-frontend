import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { QUERY_USER_INFO } from "constants/query";
import { UserInfoResponse } from "types/Responses";

const useUserInfo = () => {
  return useQuery<UserInfoResponse>([QUERY_USER_INFO], async () => {
    const { data } = await axios.get<UserInfoResponse>(
      process.env.NEXT_PUBLIC_BACKEND_URL + "/user",
      { withCredentials: true }
    );

    return data;
  });
};

export default useUserInfo;
