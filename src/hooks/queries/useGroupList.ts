import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { GroupListResponse } from "types/Responses";

const useGroupList = () => {
  return useQuery<GroupListResponse>(["groups"], async () => {
    const { data } = await axios.get<GroupListResponse>(
      process.env.NEXT_PUBLIC_BACKEND_URL + "/admin/groups",
      { withCredentials: true }
    );

    return data;
  });
};

export default useGroupList;
