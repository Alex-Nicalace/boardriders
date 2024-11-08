import supabase from '../supabase';
import { TUpdateCurrentUserArgs } from './apiAuth.types';

export async function updateCurrentUser({
  firstName,
  lastName,
  middleName,
  sex,
  dateBirth,
  phone,
  email,
  currentPassword,
  newPassword,
  avatar,
  fullName,
}: TUpdateCurrentUserArgs) {
  // проверка существования текущего сеанса. Данные из локального хранилища.
  const { data: session } = await supabase.auth.getSession();
  const user = session.session?.user;
  if (!user) {
    throw new Error('Пользователь не авторизован');
  }

  if (newPassword) {
    // Аутентификация пользователя с текущим паролем
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: user.email!,
      password: currentPassword,
    });
    if (authError) {
      console.error(authError);
      throw new Error(authError.message);
    }
  }

  // обновить пользователя в базе данных
  const { data, error } = await supabase.auth.updateUser({
    ...(newPassword && { password: newPassword }),
    // ...(email && { email }), // не обновляет почту без подтверждения
    data: {
      firstName,
      lastName,
      middleName,
      sex,
      dateBirth,
      phone,
      email,
      avatar,
      fullName,
    },
  });

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data;
}
