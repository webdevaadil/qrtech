import React from "react";
import styles from "../Css/Mainnav.module.css";
import mainnavlogo from "../Img/avatar.jpg";
import { Mainsidenav } from "./Mainsidenav.js";

export const Mainnav = () => {
  return (
    <>
      <div class={`${styles.navbarcustom}`}>
        <ul class={`${ styles.topbarrightmenu} list-unstyled float-right mb-0`}>
          <li class="dropdown notification-list">
            <button
              class={`${styles.navlink} dropdown-toggle nav-user arrow-none mr-0`}
              data-toggle="dropdown"
              role="button"
              aria-haspopup="false"
              aria-expanded="false"
            >
              <span class="account-user-avatar">
                <img
                  src={mainnavlogo}
                  alt="user-image"
                  class="rounded-circle"
                />
              </span>
              <span>
                <span class="account-user-name">User</span>
              </span>
            </button>
            <div class="dropdown-menu dropdown-menu-right dropdown-menu-animated topbar-dropdown-menu profile-dropdown">
              <div class=" dropdown-header noti-title">
                <h6 class="text-overflow m-0">Welcome !</h6>
              </div>

              <button
                
                class="dropdown-item notify-item"
              >
                <i class="mdi mdi-account-circle mr-1"></i>
                <span>My Account</span>
              </button>

              <button
                
                class="dropdown-item notify-item"
              >
                <form
                  id="logout-form"
                 
                  style={{display: "none"}}
                ></form>
                <i class="mdi mdi-logout mr-1"></i>
                <span>Logout</span>
              </button>
            </div>
          </li>
        </ul>
     
      </div>
      <Mainsidenav/>
    </>
  );
};