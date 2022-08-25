import useUserInfo from "./useUserInfo";

const useAdmin = () => {
  const { isLoading, data } = useUserInfo();

  if (isLoading || !data) {
    return null;
  }

  return data.groups
    .map((group) => group.split(",")[0].split("=")[1] === "admin")
    .some((check) => check);
};

export default useAdmin;
