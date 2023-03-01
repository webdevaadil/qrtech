import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../Css/Mainside.module.css";
import mainnavlogo from "../Img/Trisquare Logo_page-0001.png";

export const Mainsidenav = () => {
  const nav = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    nav("/");
  };
  return (
    <div className={styles.mainhead}>
      <div>
        <div class={`${styles.leftsidemenu} mm-show`}>
          <span class="header_logo__flVO7 text-center logo-light">
            <span class="logo-lg">
              <img src={mainnavlogo} className={`${styles.navimglogo}`}alt="Logo" />
            </span>
          </span>

          <div class="simplebar-wrapper">
            <div class="simplebar-height-auto-observer-wrapper"></div>
            <div class={`${styles.simplebarmask}`}>
              <div class={styles.simplebaroffset}>
                <div class="simplebar-content-wrapper">
                  <div class="simplebar-content">
                    <ul class={`${styles.metismenu} side-nav mm-show`}>
                      <li class="side-nav-item mm-active">
                        <Link to="/main" class="side-nav-link active d-flex">
                          <i class="mdi mdi-home"></i>
                          <p className={`${styles.sidenavspan}`}> Dashboard </p>
                        </Link>
                      </li>

                      <li class="side-nav-item">
                        <Link to="/main/viewlist" class="side-nav-link d-flex">
                          <i class="mdi mdi-view-list"></i>
                          <p className={`${styles.sidenavspan}`}> View List</p>
                        </Link>
                      </li>

                      <li class="side-nav-item">
                        <Link to={"/main/account"} class="side-nav-link d-flex">
                          <i class="mdi mdi-account-settings"></i>
                          <p className={`${styles.sidenavspan}`}>My Account</p>
                        </Link>
                      </li>
                      <li class="side-nav-item">
                        <Link
                          class="side-nav-link d-flex"
                          to={"/main/change-password"}
                        >
                          <i class="mdi mdi-lock-outline"></i>
                          <p className={`${styles.sidenavspan}`}>Change Password</p>
                        </Link>
                      </li>
                      <li class="side-nav-item ">
                        <a onClick={logout} class="side-nav-link d-flex">
                          <i class="mdi mdi-logout"></i>
                          <p className={`${styles.sidenavspan}`}>Logout</p>
                        </a>
                      </li>
                    </ul>

                    <div class="help-box text-white text-center"></div>

                    <div class="clearfix"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="simplebar-placeholder"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
