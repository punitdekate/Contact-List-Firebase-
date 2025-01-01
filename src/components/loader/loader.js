import React from "react";
import styles from "./loader.module.css"; // Create a separate CSS file for styling

const Loader = () => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loader}></div>
    </div>
  );
};

export default Loader;
