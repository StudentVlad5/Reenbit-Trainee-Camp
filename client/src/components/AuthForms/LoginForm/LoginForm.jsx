import { useState } from "react";
import { useDispatch } from "react-redux";
import { useFormik, Formik, Form, Field } from "formik";
import { ImEye, ImEyeBlocked } from "react-icons/im";
import { FaCheck, FaTimes } from "react-icons/fa";
import schemas from "../../Schemas/schemas";
import { logIn } from "../../../redux/auth/operations";
import css from "./loginForm.module.css";


const LoginForm = ({ setStatusLogin }) => {
  const [isShown, setIsShown] = useState(true); //
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const hideForm = () => {
    setIsShown(true);
  };

  const onSubmit = (values) => {
    setIsLoading(true);
    const { email, password } = values;
    dispatch(
      logIn({
        email,
        password,
      }),
      hideForm(),
      setIsLoading(false)
    );
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schemas.schemasLogin,
    onSubmit,
  });

  const isValid =
    (formik.errors.email && formik.touched.email) ||
    (formik.errors.password && formik.touched.password) ||
    formik.values.email === ""
      ? true
      : false;

  const showPassword = () => {
    setShowPass(!showPass);
  };

  const showAccentValidateInput = (hasValue, isValide) => {
    return !hasValue ? null : isValide ? "#E2001A" : "#3CBC81";
  };
  return (
    <>
      <Formik validationSchema={schemas.schemasLogin}>
        <Form
          className={css.form}
          name="form-contacts"
          onSubmit={formik.handleSubmit}
          autoComplete="off"
        >
          <h1 className={css.form__title}>{"Login"}</h1>
          {isShown && (
            <div className={css.form__wrapper}>
              <Field
                className={css.form__input}
                style={{
                  borderColor: showAccentValidateInput(
                    formik.values.email,
                    formik.errors.email
                  ),
                }}
                name="email"
                type="email"
                placeholder="Email"
                validate={schemas.schemasLogin.email}
                onChange={formik.handleChange}
                value={formik.values.email}
                onBlur={formik.handleBlur}
              />
              {!formik.values.email ? null : !formik.errors.email ? (
                <FaCheck
                  className={css["form__icon-check"]}
                  color={"#3CBC81"}
                />
              ) : (
                <FaTimes
                  className={css["form__icon-check"]}
                  color={"#E2001A"}
                />
              )}
              {formik.errors.email || formik.touched.email ? (
                <div className={css["form__input-error"]}>
                  {formik.errors.email}
                </div>
              ) : null}
            </div>
          )}

          {isShown && (
            <div className={css.form__wrapper}>
              <Field
                className={css.form__input}
                style={{
                  borderColor: showAccentValidateInput(
                    formik.values.password,
                    formik.errors.password
                  ),
                }}
                name="password"
                type={showPass ? "text" : "password"}
                placeholder="Password"
                onChange={formik.handleChange}
                value={formik.values.password}
                onBlur={formik.handleBlur}
              />

              <span className={css["form__icon-show"]} onClick={showPassword}>
                {!showPass ? <ImEyeBlocked /> : <ImEye />}
              </span>
              {formik.errors.password && formik.touched.password ? (
                <div className={css["form__input-error"]}>
                  {formik.errors.password}
                </div>
              ) : null}
            </div>
          )}

          {isShown && (
            <button className={css.form__btn} type="submit" disabled={isValid}>
              {"Login"}
            </button>
          )}

          {!isShown && (
            <button className={css.form__btn} type="submit">
              {"Login"}
            </button>
          )}
          <div className={css.form_text} onClick={() => setStatusLogin(false)}>
            <span>
              {"Still don't have an account? "}
              <span className={css["form_text--bold"]}>Register</span>
            </span>
          </div>
        </Form>
      </Formik>
      {isLoading && <h1 style={{ textAlign: "center" }}>{"Loading..."}</h1>}
    </>
  );
};

export default LoginForm;
