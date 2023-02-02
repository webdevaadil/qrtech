import React from "react";
import { Link } from "react-router-dom";
import styles from '../Css/header.module.css';
import img from '../Img/Headerlogo.jpg';
export const Header = () => {
  return <>
<header className={styles.header}>
<div className={styles.headerfirst}>
<img src={img} alt="" srcset="" />
<nav className={styles.nav}>
  <Link to="/login"className={`${styles.navitem} btn btn-default ${styles.navitemlogin}`}>Login</Link>
  <Link to="/register"className={`${styles.navitem} btn  ${styles.navitemgetstart}`}>Get Started</Link>
</nav>
</div>

</header>
  </>;
};
