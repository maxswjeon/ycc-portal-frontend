import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { UserResponse } from "types/Responses";

const useUserDetail = () => {
  return useQuery<UserResponse>(["me"], async () => {
    const { data } = await axios.get<UserResponse>(
      process.env.NEXT_PUBLIC_BACKEND_URL + "/user/detail",
      { withCredentials: true }
    );
    return data;
  });
};

export default useUserDetail;
