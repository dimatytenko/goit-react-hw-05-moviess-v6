import React from "react";
import styles from "./ButtonGoBack.module.css";
import { ReactComponent as ArrowLeft } from "../../icons/arrow-left.svg";
import PropTypes from "prop-types";

export default function ButtonGoBack({ onClick }) {
  return (
    <button className={styles.button} type="button" onClick={onClick}>
      <ArrowLeft width="20" height="15" />
      Go back
    </button>
  );
}
ButtonGoBack.propTypes = {
  onClick: PropTypes.func,
};
