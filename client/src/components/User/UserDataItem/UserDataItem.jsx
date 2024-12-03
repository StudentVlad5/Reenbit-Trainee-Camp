import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../redux/auth/selectors";
import { update } from "../../../redux/auth/operations";
import { FaCheck } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import css from "./UserDataItem.module.css";

export const UserDataItem = ({
  name,
  label,
  type,
  defaultValue,
  profile,
  active,
  setActive,
}) => {
  const emailRegExp = /^.+@.+\..+$/;
  const cityRegex = /^[a-zA-Z\s,'-]+$/;
  const phoneRegExp = /^380\d{9}/;
  const dayToday = new Date().toLocaleDateString();
  const minDate = new Date("01.01.1910").toLocaleDateString();

  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState(defaultValue ?? "");
  const [isError, setIsError] = useState("");
  const dataUserId = useSelector(getUser);

  const handleChange = (e) => {
    const { name, value } = e.currentTarget;

    if (name === "userName") {
      setInputValue(value);
    }
    if (name === "email") {
      setInputValue(value);
    } else if (name === "birthday") {
      setInputValue(value);
    } else if (name === "phone") {
      setInputValue(value);
    } else if (name === "location") {
      setInputValue(value);
    }
  };

  const handleSubmit = (name) => {
    if (name === "userName") {
      setActive("userName");
      if (!inputValue) {
        setIsError("Please enter your name");
        return;
      }
      if (
        inputValue.length !== 0 &&
        (inputValue.length < 2 || inputValue.length > 16)
      ) {
        setIsError("type from 2 to 16 letters");
        return;
      }
      setIsError("");
      setActive("");
      dispatch(update({ ...dataUserId, userName: inputValue }));
    } else if (name === "email") {
      setActive("email");
      if (!inputValue.match(emailRegExp)) {
        setIsError("please type valid email");
        return;
      }
      setIsError("");
      setActive("");
      dispatch(update({ ...dataUserId, email: inputValue }));
    } else if (name === "birthday") {
      setActive("birthday");
      if (new Date(inputValue) > dayToday) {
        setIsError("date must be current");
        return;
      }
      if (new Date(inputValue) < minDate) {
        setIsError("date must be current");
        return;
      }
      setIsError("");
      setActive("");
      dispatch(
        update({
          ...dataUserId,
          birthday: inputValue,
        })
      );
    } else if (name === "phone") {
      setActive("phone");
      if (!inputValue) {
        setIsError("Please enter a phone number");
        return;
      }
      if (!phoneRegExp.test(inputValue)) {
        setIsError("please type valid phone number starting with 380");
        return;
      }
      if (inputValue.length !== 13) {
        setIsError("phone number should contain 13 digits");
        return;
      }
      setIsError("");
      setActive("");
      dispatch(update({ ...dataUserId, phone: inputValue  }));
    } else if (name === "location") {
      setActive("location");
      if (!inputValue.match(cityRegex)) {
        setIsError("use format Kyiv, Brovary");
        return;
      }
      setIsError("");
      setActive("");
      dispatch(update({ ...dataUserId, location: inputValue  }));
    }
  };

  const activeHandleClick = (name) => {
    if (!active) setActive(name);
  };

  return (
    <>
      <li className={css["item-wrapper"]}>
        <label htmlFor={name} className={css["title-name"]}>
          {label}
        </label>

        <div className={css["item-input-btn-wrapper"]}>
          <input
            value={!profile ? inputValue : defaultValue}
            onChange={handleChange}
            className={active === name ? css.active : "" + css["item-input"]}
            disabled={active !== name}
            type={type}
            name={name}
            id={name}
          />
          {isError && active === name ? (
            <div className={css.error}>{isError}</div>
          ) : null}

          {!profile &&
            (active === name ? (
              <button
                className={css["item-btn"]}
                type="button"
                onClick={() => handleSubmit(name)}
              >
                <FaCheck className={css["icon-check"]} width="20" height="20" />
              </button>
            ) : (
              <button
                className={css["item-btn"]}
                type="button"
                disabled={active && active !== name}
                onClick={() => activeHandleClick(name)}
              >
                <FaPencilAlt
                  className={css["icon-pencil"]}
                  width="20"
                  height="20"
                />
              </button>
            ))}
        </div>
      </li>
    </>
  );
};
