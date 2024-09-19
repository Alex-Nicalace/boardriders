import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useUser } from '../../features/authentication/useUser';
import Spinner from '../Spinner';
import { useAppSelector } from '../../hooks/reduxHooks';
import { getGender } from '../../features/gender/genderSlice';

// type TProtectedRouteProps = { }
function ProtectedRoute(/*{ }: TProtectedRouteProps*/): JSX.Element {
  const gender = useAppSelector(getGender);
  const navigate = useNavigate();
  // 1. Загрузка аутентифицированных данных пользователя
  const { isLoading, isAuthenticated, error } = useUser();

  // 3. Если пользователь не аутентифицирован, показать страницу авторизации
  useEffect(() => {
    if (!isLoading && !isAuthenticated) navigate(`/${gender}#login`);
  }, [isAuthenticated, navigate, isLoading, gender]);

  // 2. Пока идет загрузка паказать спиннер
  if (isLoading) return <Spinner />;

  if (error) {
    console.error(`Пользователь не аутентифицирован! ${error}`);
  }

  return <>{isAuthenticated && <Outlet />}</>;
}

export default ProtectedRoute;
