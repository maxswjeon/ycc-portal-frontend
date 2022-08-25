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
  name: string;
  groups: string[];
};
