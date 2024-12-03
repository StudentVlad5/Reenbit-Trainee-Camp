import { useState } from "react";
import { useDispatch } from "react-redux";
import { useAuth } from "../../services/useAuth";
import { update } from "../../redux/auth/operations";
import { TiCamera } from "react-icons/ti";
import defaultUserPhoto from "../../img/no-profile-picture-icon.svg";
import { UserDataItem } from "./UserDataItem/UserDataItem";
import css from "./user.module.css";

export const User = () => {
  const [active, setActive] = useState("");
  const dispatch = useDispatch();
  let { userIn } = useAuth();

  // __________________________________________________

  const changeAvatar = (e) => {
    dispatch(update({ ...userIn, avatar: e.target.files[0]}));
  };

  let profile = false;

  const birthday = userIn.birthday
    ? new Date(userIn.birthday).toISOString().slice(0, 10)
    : "";

  return (
    <>
      <section className={css.user + " " + css.section}>
        <div className={css.user__container + " " + css.container}>
          <div
            className={css.edit_container}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className={css["title-group"]}>
              <h2 className={css["section-title--size-s"]}>My information:</h2>
            </div>
            <div className={css.user__wrapper}>
              <div className={css["img-box"]}>
                <img
                  className={css["user-img"]}
                  width="250"
                  height="250"
                  src={userIn.avatar ? userIn.avatar : defaultUserPhoto}
                  alt="User"
                />
                <div className={css["change-wrapper"]}>
                  <div className={css["edit-camera-warapper"]}>
                    <label htmlFor="user_photo" className={css["lable-user"]}>
                      <TiCamera className={css["edit-icon"]} size={18} />
                      <span className={css["edit-photo-text"]}>Edit photo</span>
                    </label>
                  </div>
                  <input
                    className={css["change-photo-user"]}
                    type="file"
                    name="file"
                    id="user_photo"
                    onChange={changeAvatar}
                    accept=".gif,.jpg,.jpeg,.webp,.png"
                  />
                </div>
              </div>
              <ul className={css["input-list"]}>
                <UserDataItem
                  className={css["input-list__item"]}
                  profile={profile}
                  label={"Name:"}
                  defaultValue={userIn.userName}
                  type="text"
                  name="userName"
                  active={active}
                  setActive={setActive}
                  id="name"
                />

                <UserDataItem
                  className={css["input-list__item"]}
                  profile={profile}
                  label={"Email:"}
                  defaultValue={userIn.email}
                  type="email"
                  name="email"
                  active={active}
                  setActive={setActive}
                  id="email"
                />

                <UserDataItem
                  className={css["input-list__item"]}
                  profile={profile}
                  label={"Birthday:"}
                  defaultValue={birthday || "01.01.1900"}
                  type="date"
                  name="birthday"
                  active={active}
                  setActive={setActive}
                  id="birthday"
                />

                <UserDataItem
                  className={css["input-list__item"]}
                  profile={profile}
                  label={"Phone:"}
                  defaultValue={userIn.phone}
                  type="tel"
                  name="phone"
                  active={active}
                  setActive={setActive}
                  id="phone"
                />

                <UserDataItem
                  className={css["input-list__item"]}
                  profile={profile}
                  label={"City:"}
                  defaultValue={userIn.location}
                  type="text"
                  name="location"
                  active={active}
                  setActive={setActive}
                  id="city"
                />
              </ul>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  flexWrap: "nowrap",
                }}
              >
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
