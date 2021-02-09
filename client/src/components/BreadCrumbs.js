import React, { memo, useMemo } from "react";
import { useLocation, Link } from "react-router-dom";
import styles from "./BreadCrumbs.module.scss";
import queryString from "query-string";

const BreadCrumbs = memo(() => {
  const { pathname, search } = useLocation();
  const searchArray = useMemo(() => queryString.parse(search), [search]);
  return (
    <div className={styles.container}>
      <Link className={styles.link} to='/'>
        Main page
      </Link>
      <span className={styles.delimiter}>&gt;</span>
      <Link
        className={
          pathname === "/users_stat"
            ? `${styles.link} ${styles.active}`
            : styles.link
        }
        to='/users_stat'
      >
        User statistics
      </Link>
      {pathname !== "/users_stat" && (
        <>
          <span className={styles.delimiter}>&gt;</span>
          <Link
            className={`${styles.link} ${styles.active}`}
            to='/user_stats/5'
          >
            {searchArray.first_name && searchArray.last_name
              ? `${searchArray.first_name} ${searchArray.last_name}`
              : "Unknown"}
          </Link>
        </>
      )}
    </div>
  );
});

export default BreadCrumbs;
