import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { AppBar } from "../AppBar/AppBar";
import css from "./Layout.module.css";

export const SharedLayout = () => {
  return (
    <div className={css.container}>
      <AppBar />
      <main  className={css.main}>
        <Suspense fallback={"Loading..."}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};
