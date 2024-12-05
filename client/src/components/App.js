// import { lazy } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { RestrictedRoute } from "../routes/RestrictedRoute";
import { PrivateRoute } from "../routes/PrivateRoute";
import { SharedLayout } from "./Layout/Layout";
import { createContext, lazy, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsRefreshing } from "../redux/auth/selectors";
import { refreshUser } from "../redux/auth/operations";
import { ChatPanel } from "./ChatPanel/ChatPanel";

const LoginForm = lazy(() => import("./AuthForms/LoginForm/LoginForm"));
const ChangePasswordForm = lazy(() =>
  import("./AuthForms/ChangePasswordForm/ChangePasswordForm")
);
const RegisterForm = lazy(() =>
  import("./AuthForms/RegisterForm/RegisterForm")
);
export  const CheckMessageContext = createContext(null);

export const App = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);
    const [statusGet, setStatusGet] = useState(true);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <></>
  ) : (
    <CheckMessageContext.Provider
      value={{
        statusGet,
        setStatusGet,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route
              index
              element={
                <RestrictedRoute
                  redirectTo="chats"
                  component={
                    <>
                      <h1>Welcome to Reenbit-Trainee-Camp Massanger</h1>
                      <p>
                        To be able to continue working, you must register or log
                        in
                      </p>
                    </>
                  }
                />
              }
            />
            <Route
              path="signin"
              element={
                <RestrictedRoute
                  redirectTo="chats"
                  component={<RegisterForm />}
                />
              }
            />
            <Route
              path="login"
              element={
                <RestrictedRoute redirectTo="chats" component={<LoginForm />} />
              }
            />
            <Route
              path="chats"
              element={
                <PrivateRoute redirectTo="/login" component={<h2>chats</h2>} />
              }
            />
            <Route
              path="chats/:id"
              element={
                <PrivateRoute redirectTo="/login" component={<ChatPanel />} />
              }
            />
            <Route
              path="change_password"
              element={
                <PrivateRoute
                  redirectTo="/"
                  component={<ChangePasswordForm />}
                />
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CheckMessageContext.Provider>
  );
};
