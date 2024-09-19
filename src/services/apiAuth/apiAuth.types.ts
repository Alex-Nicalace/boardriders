export type TLoginParams = {
  email: string;
  password: string;
};

export type TSignupParams = TLoginParams & {
  fullName: string;
};

export type TUserMetaData = {
  fullName?: string;
  avatar?: string;
  dateBirth?: string;
  phone?: string;
  email?: string;
  sex?: string;
};
