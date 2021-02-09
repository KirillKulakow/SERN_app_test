import React, { memo } from "react";
import styles from "./Footer.module.scss";

const Footer = memo(() => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <h2 className={styles.bottom_info_logo}>AppCo</h2>
        <p className={styles.bottom_info_rights}>
          All rights reserved by ThemeTags
        </p>
        <p className={styles.bottom_info_rights}>Copyrights © 2019</p>
      </div>
    </footer>
  );
});

export default Footer;
