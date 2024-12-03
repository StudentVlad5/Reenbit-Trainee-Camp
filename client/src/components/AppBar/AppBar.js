import css from "./AppBar.module.css";
import noPhoto from "../../img/no-profile-picture-icon.svg";
import { Button } from "../Button/Button";
import { Link } from "react-router-dom";
import { selectIsLoggedIn, getUser } from "../../redux/auth/selectors";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import { logOut } from "../../redux/auth/operations";
import { User } from "../User/User";
import { getAllUsers } from "../../services/api";
import { onFetchError } from "../../services/NotifyMessages";
import { SearchPanel } from "../SearchPanel/SearchPanel";

export const AppBar = () => {
  const [statusModal, setStatusModal] = useState(false);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(getUser);
  const dispatch = useDispatch();
  const [listUsers, setListUsers] = useState([]);
  const [filterListUsers, setFilterListUsers] = useState([]);

  useEffect(() => {
    if (user._id) {
      try {
        getAllUsers(user._id).then(function (result) {
          setListUsers(result.data);
        });
      } catch {
        onFetchError("No access, please contact the administrator");
      }
    }
  }, [user._id]);

  return (
    <header className={css.wrapper}>
      <section className={css.section}>
        {!isLoggedIn ? (
          <div>
            <img src={noPhoto} alt="user avatar" className={css.userAvatar} />
            <div className={css.buttonContainer}>
              <Link to="signin">
                <Button type="button" aria-label="registration">
                  Registration
                </Button>
              </Link>
              <Link to="login">
                <Button type="button" aria-label="Log in">
                  Log in
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <img
              src={user?.avatar ? user?.avatar : noPhoto}
              alt="user avatar"
              className={css.userAvatar}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = { noPhoto };
              }}
            />
            <div className={css.buttonContainer}>
              <Button
                type="button"
                aria-label="edit profile"
                onClick={() => setStatusModal(true)}
              >
                Edit profile
              </Button>
              <Button
                type="button"
                aria-label="Log out"
                onClick={() => dispatch(logOut())}
              >
                Log out
              </Button>
              <Link to="change_password">
                <Button type="button" aria-label="Change password">
                  Change PW
                </Button>
              </Link>
            </div>
            {user && (
              <ul>
                <li>{user.userName}</li>
                <li>{user.email}</li>
                <li>{user.phone}</li>
                <li>{user.role}</li>
              </ul>
            )}
          </div>
        )}
        {listUsers && (
          <SearchPanel
            setFilterListUsers={setFilterListUsers}
            listUsers={listUsers}
          />
        )}
        {filterListUsers &&
          filterListUsers.length > 0 &&
          filterListUsers.map((it) => {
            return (
              <Link to={`chats/${it._id}`} key={it._id}>
              <ul >
                <li>
                  <img
                    src={it?.avatar ? it?.avatar : noPhoto}
                    alt={it.userName}
                    style={{ width: "100px", height: "100px" }}
                  />
                </li>
                <li>{it.userName}</li>
                <li>{it.phone}</li>
                <li>{it.email}</li>
                <li>{it.isActivate ? "on" : "off"}</li>
              </ul>
              </Link>
          )})}
      </section>
      {statusModal && (
        <Modal closeFunction={setStatusModal}>
          <User />
        </Modal>
      )}
    </header>
  );
};
