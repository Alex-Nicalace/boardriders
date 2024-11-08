import supabase from '../supabase';
import { TSignupParams } from './apiAuth.types';

export async function signup({ email, password, fullName }: TSignupParams) {
  const [lastName, firstName, ...middleName] = fullName.split(' ');
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
        firstName,
        lastName,
        middleName: middleName.join(' '),
      },
    },
  });

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data;
}
