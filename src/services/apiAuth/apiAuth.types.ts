export type TLoginParams = {
  email: string;
  password: string;
};

export type TSignupParams = TLoginParams & {
  fullName: string;
};
