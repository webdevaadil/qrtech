import React from "react";
import { Link } from "react-router-dom";
import styles from "../Css/Mainside.module.css";
import mainnavlogo from "../Img/mainnavlogo.jpg";

export const Mainsidenav = () => {
  return   <div className={styles.mainhead}>
  <div>
    <div class={`${styles.leftsidemenu} mm-show`}>
      
   

      <a
        class={`${styles.logo} text-center logo-light`}
      >
        <span class="logo-lg">
          <img
            src={mainnavlogo}
            alt="Logo"
          />
        </span>
      </a>

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
                      <Link to="/main"
                        class="side-nav-link active"
                      >
                        <i class="mdi mdi-home"></i>
                        <span> Dashboard </span>
                      </Link>
                    </li>

                    <li class="side-nav-item">
                      <Link to="/main/viewlist"
                        class="side-nav-link"
                      >
                        <i class="mdi mdi-bell"></i>
                        <span> View List</span>
                      </Link>
                    </li>

                    <li class="side-nav-item">
                      <a
                        href="javascript: void(0);"
                        class="side-nav-link"
                      >
                        <i class="mdi mdi-tools"></i>
                        <span> Settings </span>
                        <span class="menu-arrow"></span>
                      </a>
                  
                        <li>
                          <a  href="#">
                        <i class="mdi mdi-account-settings"></i>
                            My Account
                          </a>
                        </li>
                        <li>
                          <a href="#">
                        <i class="mdi mdi-lock-outline"></i>
                            Change Password
                          </a>
                        </li>
                    </li>
                  </ul>

                  <div class="help-box text-white text-center">
                   
                  </div>

                  <div class="clearfix"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="simplebar-placeholder"></div>
        </div>
        <div class="simplebar-track simplebar-horizontal">
          <div class="simplebar-scrollbar"></div>
        </div>
        <div class="simplebar-track simplebar-vertical">
          <div class="simplebar-scrollbar"></div>
        </div>
      </div>
    </div>
  </div>
</div>
};
