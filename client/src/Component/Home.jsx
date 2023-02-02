import React from "react";
import { Header } from "./Header";
import styles from "../Css/home.module.css";
import homeinmg from "../Img/secure.png";
import { Footer } from "./Footer";

export const Home = () => {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.baneerleft}>
            <h2 style={{ fontSize: "3rem" }}>
              Organized and Secure
              <br />
              <b style={{ fontWeight: "bolder" }}>Access to all your files</b>
            </h2>
            <button className="btn btn ">sign up For Free</button>
          </div>
          <div className={styles.baneerright}>
            <img src={homeinmg} alt="" />
          </div>
        </div>

      </div>
     
      <Footer />
    </>
  );
};
