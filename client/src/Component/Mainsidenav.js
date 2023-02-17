import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../Css/Mainside.module.css";
import mainnavlogo from "../Img/Trisquare Logo_page-0001.png";

export const Mainsidenav = () => {
  const nav= useNavigate()
  const logout=()=>{
    localStorage.removeItem("token")
nav("/")
  }
  return (
    <div className={styles.mainhead}>
      <div>
        <div class={`${styles.leftsidemenu} mm-show`}>
          <span class={`${styles.logo} text-center logo-light`}>
            <span class="logo-lg">
              <img src={mainnavlogo} alt="Logo" style={{width:'50px'  }}/>
            </span>
          </span>

          <div
            class="h-100 mm-active"
            id="left-side-menu-container"
            data-simplebar="init"
          >
            <div class="simplebar-wrapper">
              <div class="simplebar-height-auto-observer-wrapper">
                <div class="simplebar-height-auto-observer"></div>
              </div>
              <div class={`${styles.simplebarmask}`}>
                <div class="simplebar-offset">
                  <div class="simplebar-content-wrapper">
                    <div class="simplebar-content">
                      <ul class={`${styles.metismenu} side-nav mm-show`}>
                        <li class="side-nav-item mm-active">
                          <Link to="/main" class="side-nav-link active">
                            <i class="mdi mdi-home"></i>
                            <span> Dashboard </span>
                          </Link>
                        </li>

                        <li class="side-nav-item">
                          <Link to="/main/viewlist" class="side-nav-link">
                            <i class="mdi mdi-bell"></i>
                            <span> View List</span>
                          </Link>
                        </li>

                        <li class="side-nav-item">
                          <Link to={"/main/account"} class="side-nav-link">
                            <i class="mdi mdi-account-settings"></i>
                            My Account
                          </Link>
                        </li>
                        <li class="side-nav-item">
                          <Link
                            class="side-nav-link"
                            to={"/main/change-password"}
                          >
                            <i class="mdi mdi-lock-outline"></i>
                            Change Password
                          </Link>
                        </li>
            <div class="help-box text-white text-center">
              <a
                
                class="btn btn-outline-light btn-sm"
                onClick={logout}
              >
                Logout
              </a>
            </div>
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
    </div>
  );
};
