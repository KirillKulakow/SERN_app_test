import React, { memo } from "react";
import styles from "./Header.module.scss";

const Header = memo(() => {
  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <a className={styles.container_logo} href='/'>
          AppCo
        </a>
      </div>
    </nav>
  );
});

export default Header;
