import { Group } from "types/Group";
import { User } from "types/User";

type ResponseBase = {
  result: boolean;
  error?: string;
};

type StatusResponse = ResponseBase & {
  status: boolean;
};

export type SessionResponse = StatusResponse;
export type LoginResponse = ResponseBase & {
  user: string;
};
export type UserInfoResponse = ResponseBase & {
  data: {
    email: string;
    name: string;
    username: string;
    verified: boolean;
    groups: string[];
  };
};
export type UserListResponse = ResponseBase & {
  data: User[];
};
export type UserResponse = ResponseBase & {
  user: User;
};
export type GroupListResponse = ResponseBase & {
  groups: Group[];
};
