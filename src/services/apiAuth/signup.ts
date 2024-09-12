import supabase from '../supabase';
import { TSignupParams } from './apiAuth.types';

export async function signup({ email, password, fullName }: TSignupParams) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: '',
        sex: '',
        dateBirth: '',
        phone: '',
      },
    },
  });

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data;
}
