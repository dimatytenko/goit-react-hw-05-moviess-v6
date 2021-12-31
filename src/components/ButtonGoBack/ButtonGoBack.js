import React from "react";
import { Link } from "react-router-dom";
import styles from "./ButtonGoBack.module.css";
import { ReactComponent as ArrowLeft } from "../../icons/arrow-left.svg";

export default function ButtonGoBack() {
  return (
    <button className={styles.button} type="button">
      <Link className={styles.buttonText} to="/">
        <ArrowLeft width="20" height="20" />
        Go back
      </Link>
    </button>
  );
}
