import { useSelector } from 'react-redux';
import {
  selectUser,
  getUser,
  selectIsLoggedIn,
  selectIsRefreshing,
} from '../redux/auth/selectors';

export const useAuth = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  const isRefreshing = useSelector(selectIsRefreshing);
  const userIn = useSelector(getUser);

  return { isLoggedIn, user, isRefreshing, userIn };
};