import supabase from '../supabase';
import { TUpdateCurrentUserArgs } from './apiAuth.types';

export async function updateCurrentUser({
  // email,
  // phone,
  password,
  ...props
}: TUpdateCurrentUserArgs) {
  // обновить пользователя в базе данных
  const { data, error } = await supabase.auth.updateUser({
    // ...(email && { email }),
    // ...(phone && { phone }),
    ...(password && { password }),
    data: props,
  });

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data;
}
