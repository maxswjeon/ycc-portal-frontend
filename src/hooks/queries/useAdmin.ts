import useUserInfo from "./useUserInfo";

const useAdmin = () => {
  return useUserInfo().data?.data.groups.includes("admin");
};

export default useAdmin;
