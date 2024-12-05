import css from "./index.module.css";
import { useEffect } from "react";
import ReactDOM from "react-dom";

export default function Modal({
  closeFunction = undefined,
  children,
  opacity = 0.6,
}) {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    const closeByEsc = document.addEventListener("keydown", (e) => {
      if (e.code === "Escape") {
        document.querySelector("body").classList.remove("scroll");
        document.querySelector("#popup-root").classList.add("is-hide");
        if (closeFunction) {
          closeFunction(false);
        }
      }
      return () => document.removeEventListener("keydown", closeByEsc);
    });
  });

  document.querySelector("body").classList.add("scroll");
  document.querySelector("#popup-root").classList.remove("is-hide");
  return ReactDOM.createPortal(
    <div
      onClick={() => {
        if (closeFunction) {
          closeFunction(false);
        }
        document.querySelector("body").classList.remove("scroll");
        document.querySelector("#popup-root").classList.add("is-hide");
      }}
      className={css.modalWrap}
      style={{ backgroundColor: `rgba(0,0,0,${opacity})` }}
    >
      {children}
    </div>,
    document.querySelector("#popup-root")
  );
}
