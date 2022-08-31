import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { UserResponse } from "types/Responses";

const useAdminUserInfo = (dn: string) => {
  return useQuery<UserResponse>(
    ["adminUserInfo", dn],
    async () => {
      const { data } = await axios.get<UserResponse>(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/admin/user/" + dn,
        { withCredentials: true }
      );

      return data;
    },
    { enabled: !!dn }
  );
};

export default useAdminUserInfo;
