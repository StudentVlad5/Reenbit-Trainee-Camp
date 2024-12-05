import { useState } from "react";
import { useDispatch } from "react-redux";
import { useFormik, Formik, Form, Field } from "formik";
import { FaCheck, FaTimes } from "react-icons/fa";
import { ImEye, ImEyeBlocked } from "react-icons/im";
import schemas from "../../Schemas/schemas";
import { register } from "../../../redux/auth/operations";
import css from "./registerForm.module.css";
import { Link } from "react-router-dom";

const RegisterForm = () => {
  const [isShown, setIsShown] = useState(true);
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const onSubmit = ({ values }) => {
    setIsLoading(true);
    const { name: userName, email, password, phone, location } = values;
    dispatch(
      register({
        userName,
        email,
        password,
        phone: phone.toString(),
        location,
      }),
      setIsLoading(false)
    );
  };

  const showForm = () => {
    setIsShown(false);
  };

  const hideForm = () => {
    setIsShown(true);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      location: "",
    },
    validationSchema: schemas.registerSchema,
    onSubmit: (values, action) => {
      onSubmit({ values, action });
    },
  });

  const isValid =
    (formik.errors.email && formik.touched.email) ||
    (formik.errors.password && formik.touched.password) ||
    (formik.errors.confirmPassword && formik.touched.confirmPassword) ||
    formik.values.email === "" ||
    formik.values.confirmPassword === ""
      ? true
      : false;

  const showPassword = () => {
    setShowPass(!showPass);
  };
  const showConfirmPassword = () => {
    setShowConfirmPass(!showConfirmPass);
  };

  const showAccentValidateInput = (hasValue, isValide) => {
    return !hasValue ? null : isValide ? "#E2001A" : "#3CBC81";
  };

  return (
    <>
      <Formik validationSchema={schemas.registerSchema}>
        <Form
          className={css.form}
          onSubmit={formik.handleSubmit}
          autoComplete="off"
        >
          <h1 className={css.form__title}>Sign in</h1>
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
                value={formik.values.email}
                validate={schemas.registerSchema.email}
                onChange={formik.handleChange}
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
              {formik.errors.email && formik.touched.email ? (
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
            <div className={css.form__wrapper}>
              <Field
                className={css.form__input}
                style={{
                  borderColor: showAccentValidateInput(
                    formik.values.confirmPassword,
                    formik.errors.confirmPassword
                  ),
                }}
                name="confirmPassword"
                type={showConfirmPass ? "text" : "password"}
                placeholder="Confirm Password"
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
                onBlur={formik.handleBlur}
              />
              <span
                className={css["form__icon-show"]}
                onClick={showConfirmPassword}
              >
                {!showConfirmPass ? <ImEyeBlocked /> : <ImEye />}
              </span>
              {formik.errors.confirmPassword &&
              formik.touched.confirmPassword ? (
                <div className={css["form__input-error"]}>
                  {formik.errors.confirmPassword}
                </div>
              ) : null}
            </div>
          )}
          {isShown && (
            <button
              className={css.form__btn}
              type="button"
              onClick={showForm}
              disabled={isValid}
            >
              Next
            </button>
          )}
          {!isShown && (
            <div className={css.form__wrapper}>
              <Field
                className={css.form__input}
                style={{
                  borderColor: showAccentValidateInput(
                    formik.values.name,
                    formik.errors.name
                  ),
                }}
                name="name"
                type="text"
                placeholder="Name"
                onChange={formik.handleChange}
                value={formik.values.name}
                onBlur={formik.handleBlur}
              />
              {!formik.values.name ? null : !formik.errors.name ? (
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
              {formik.errors.name && formik.touched.name ? (
                <div className={css["form__input-error"]}>
                  {formik.errors.name}
                </div>
              ) : null}
            </div>
          )}
          {!isShown && (
            <div className={css.form__wrapper}>
              <Field
                className={css.form__input}
                style={{
                  borderColor: showAccentValidateInput(
                    formik.values.location,
                    formik.errors.location
                  ),
                }}
                name="location"
                type="text"
                placeholder="Location, region"
                value={formik.values.location}
                onBlur={formik.handleBlur}
                onChange={(e) => {
                  formik.handleChange(e);
                }}
              />
              {!formik.values.location ? null : !formik.errors.location ? (
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
              {formik.errors.location && formik.touched.location ? (
                <div className={css["form__input-error"]}>
                  {formik.errors.location}
                </div>
              ) : null}
            </div>
          )}
          {!isShown && (
            <div className={css.form__wrapper}>
              <Field
                className={css.form__input}
                style={{
                  borderColor: showAccentValidateInput(
                    formik.values.phone,
                    formik.errors.phone
                  ),
                }}
                id="phone"
                type="phone"
                placeholder="Mobile phone"
                onChange={formik.handleChange}
                value={formik.values.phone}
                onBlur={formik.handleBlur}
                name="phone"
              />
              {!formik.values.phone ? null : !formik.errors.phone ? (
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
              {formik.errors.phone && formik.touched.phone ? (
                <div className={css["form__input-error"]}>
                  {formik.errors.phone}
                </div>
              ) : null}
            </div>
          )}
          {!isShown && (
            <button className={css.form__btn} type="submit">
              Register
            </button>
          )}
          {!isShown && (
            <button
              className={css["form__btn--back"]}
              type="button"
              onClick={hideForm}
            >
              Back
            </button>
          )}
          <Link to={"/login"}>
            <div className={css.form_text}>
              <span>
                Already have an account?{" "}
                <span className={css["form_text--bold"]}>Login</span>
              </span>
            </div>
          </Link>
        </Form>
      </Formik>
      {isLoading && <h1 style={{ textAlign: "center" }}>Loading...</h1>}
    </>
  );
};


export default RegisterForm;
