import { User } from '@supabase/supabase-js';
import supabase from '../supabase';
import { TUserMetaData } from './apiAuth.types';

export async function getCurrentUser() {
  // проверка существования текущего сеанса. Данные из локального хранилища.
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  // получение данных пользователя из базы данных Supabase.
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data.user as Omit<User, 'user_metadata'> & {
    user_metadata: TUserMetaData;
  };
}
