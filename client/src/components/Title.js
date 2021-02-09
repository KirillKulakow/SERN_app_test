import React, { memo } from "react";
import { useLocation } from "react-router-dom";
import styles from "./Title.module.scss";

const Title = memo(({ text }) => {
  let { pathname } = useLocation();
  return (
    <h3
      className={
        pathname === "/users_stat" ? styles.title_stats : styles.title_info
      }
    >
      {text}
    </h3>
  );
});

export default Title;
