import React from "react";
import { Link } from "react-router-dom";
import styles from '../Css/header.module.css';
import img from '../Img/Headerlogo.jpg';
import mainnavlogo from "../Img/Trisquare Logo_page-0001.png";

export const Header = () => {
  return <>
<header className={styles.header}>
<div className={styles.headerfirst}>
<span class={`${styles.logo} text-center logo-light`}>
            <span class="logo-lg">
              <img src={mainnavlogo} alt="Logo" style={{width:'90px'  }}/>
            </span>
          </span>
{/* <img src={img} alt="" srcset="" /> */}
{/* <a class="navbar-brand" >LOGO</a> */}
<nav className={styles.nav}>
  <Link to="/login"className={`${styles.navitem} btn btn-default ${styles.navitemlogin}`}>Login</Link>
  <Link to="/register"className={`${styles.navitem} btn  ${styles.navitemgetstart}`}>Get Started</Link>
</nav>
</div>

</header>
  </>;
};
