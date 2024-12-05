import { useState } from "react";
import { useSelector } from "react-redux";
import { useFormik, Formik, Form, Field } from "formik";
import { ImEye, ImEyeBlocked } from "react-icons/im";
import schemas from "../../Schemas/schemas";
import { changePassword } from "../../../services/auth";
import css from "./changePasswordForm.module.css";
import { onFetchError } from "../../../services/NotifyMessages";
import { selectId } from "../../../redux/auth/selectors";

const ChangePasswordForm = () => {
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const userinID = useSelector(selectId);

  async function changePasswordUser(id, password) {
    let isChangePasswordUser = window.confirm("Are you sure?");
    if (isChangePasswordUser) {
      setIsLoading(true);
      try {
        const { date } = await changePassword(`${id}`, password);
        formik.resetForm();
        return date;
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
  }

  const onSubmit = (values) => {
    setIsLoading(true);
    const { password } = values;
    changePasswordUser(userinID, password);
    setIsLoading(false);
  };
  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: schemas.schemasChangePassword,
    onSubmit,
  });

  const isValid =
    formik.errors.password && formik.touched.password ? true : false;

  const showPassword = () => {
    setShowPass(!showPass);
  };

  const showAccentValidateInput = (hasValue, isValide) => {
    return !hasValue ? null : isValide ? "#E2001A" : "#3CBC81";
  };
  return <div className={css.backdrop}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <Formik validationSchema={schemas.schemasLogin}>
          <Form
            className={css.form}
            name="form-changePassword"
            onSubmit={formik.handleSubmit}
            autoComplete="off"
          >
            <h1 className={css.form__title}>{"Change Password"}</h1>

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
            <button className={css.form__btn} type="submit" disabled={isValid}>
              {"Change Password"}
            </button>
          </Form>
        </Formik>
        {isLoading && <h1 style={{ textAlign: "center" }}>{"Loading..."}</h1>}
        {error && onFetchError("Whoops, something went wrong")}
      </div>
    </div>
};

export default ChangePasswordForm;
