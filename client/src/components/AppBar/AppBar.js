import css from "./AppBar.module.css";
import noPhoto from "../../img/no-profile-picture-icon.svg";
import { Button } from "../Button/Button";
import { Link, NavLink } from "react-router-dom";
import { selectIsLoggedIn, getUser } from "../../redux/auth/selectors";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import { logOut } from "../../redux/auth/operations";
import { User } from "../User/User";
import { getAllUsers } from "../../services/api";
import { onFetchError } from "../../services/NotifyMessages";
import { SearchPanel } from "../SearchPanel/SearchPanel";
import { FaCircleCheck } from "react-icons/fa6";

export const AppBar = () => {
  const [statusModal, setStatusModal] = useState(false);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(getUser);
  const dispatch = useDispatch();
  const [listUsers, setListUsers] = useState([]);
  const [filterListUsers, setFilterListUsers] = useState([]);
  const [fetchStatus, setFetchStatus] = useState(false);

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
  }, [user._id, fetchStatus]);

  useEffect(() => {
    const v = setTimeout(() => setFetchStatus((prev) => !prev), 60000);
    return () => clearTimeout(v);
  }, [fetchStatus]);

  return (
    <header className={css.wrapper}>
      <section className={css.section}>
        {!isLoggedIn ? (
          <div className={css.dataProfile}>
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
          <div className={css.WrapProfile}>
            <div className={css.dataProfile}>
              <div className={css.checkContainer}>
                <img
                  src={user?.avatar ? user?.avatar : noPhoto}
                  alt="user avatar"
                  className={css.userAvatar}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = { noPhoto };
                  }}
                />
                <FaCircleCheck className={css.checkStatus} />
              </div>
              {user && (
                <ul className={css.list}>
                  <li className={css.title}>
                    <b>Name:</b> {user.userName}
                  </li>
                  <li>
                    <a href={`mailto:${user.email}`}>
                      <b>Email:</b> {user.email}
                    </a>
                  </li>
                  <li>
                    <a href={`tel:${user.phone}`}>
                      <b>Phone:</b> {user.phone}
                    </a>
                  </li>
                  <li>
                    <b>Role:</b> {user.role}
                  </li>
                </ul>
              )}
            </div>
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
          </div>
        )}
        {isLoggedIn && listUsers && listUsers.length > 0 && (
          <SearchPanel
            setFilterListUsers={setFilterListUsers}
            listUsers={listUsers}
          />
        )}
        {isLoggedIn &&
          filterListUsers &&
          filterListUsers.length > 0 &&
          filterListUsers.map((it) => {
            return (
              <NavLink to={`chats/${it._id}`} key={it._id}>
                <ul className={css.contactList}>
                  <li className={css.imgContact}>
                    <img
                      src={it?.avatar ? it?.avatar : noPhoto}
                      alt={it.userName}
                    />
                    {+it.count > 0 && (
                      <span className={css.countNewLetters}>{it.count}</span>
                    )}
                    <span className={css.countCheckOnline}>
                      {it.isActivate ? (
                        <FaCircleCheck style={{ fill: "gray" }} />
                      ) : (
                        <FaCircleCheck style={{ fill: "green" }} />
                      )}
                    </span>
                  </li>
                  <li className={css.dataContact}>
                    <span className={css.title}>{it.userName}</span>
                    <span>{it.phone}</span>
                    <span>{it.email}</span>
                  </li>
                </ul>
              </NavLink>
            );
          })}
      </section>
      {statusModal && (
        <Modal closeFunction={setStatusModal}>
          <User />
        </Modal>
      )}
    </header>
  );
};
