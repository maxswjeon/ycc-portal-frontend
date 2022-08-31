import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { QUERY_USER_LIST } from "constants/query";
import { UserListResponse } from "types/Responses";

const useUserList = () => {
  return useQuery<UserListResponse>([QUERY_USER_LIST], async () => {
    const { data } = await axios.get<UserListResponse>(
      process.env.NEXT_PUBLIC_BACKEND_URL + "/admin/users",
      { withCredentials: true }
    );

    return data;
  });
};

export default useUserList;
