import React from "react";
import styles from "../Css/Dashboardnav.module.css";
export const Dashboardnav = () => {
  return <div>
    <div className={styles.simplebarcontent} >

  <ul className={`${styles.metismenu} side-nav mm-show`}>

      <li className="side-nav-item">
          <a href="http://3.109.219.236/personal/dashboard" className="side-nav-link active" aria-expanded="false">
              <i className="uil-home-alt"></i>
              <span> Dashboard </span>
          </a>

      </li>

   <li className="side-nav-item">
          <a href="http://3.109.219.236/personal/enquiries" className="side-nav-link" aria-expanded="false">
              <i className="mdi mdi-bell"></i>
              <span> View List</span>
          </a>

      </li>


  <li className="side-nav-item">
      <a  className="side-nav-link" aria-expanded="false">
          <i className="mdi mdi-tools"></i>
          <span> Settings </span>
          <span className="menu-arrow"></span>
      </a>
      <ul className="side-nav-second-level mm-collapse" >
          <li>
              <a href="http://3.109.219.236/personal/my-account/24/edit">My Account</a>
          </li>
          <li>
              <a href="http://3.109.219.236/personal/change-password">Change Password</a>
          </li>
      </ul>
  </li>
</ul>

<div className="help-box text-white text-center">
  <a href="http://3.109.219.236/logout" className="btn btn-outline-light btn-sm" >Logout</a>
  <form id="sidebar-logout-form" action="http://3.109.219.236/logout">
  </form>
</div>

<div className="clearfix"></div>

</div></div>;
};
