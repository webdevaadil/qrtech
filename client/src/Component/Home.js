import React, { useEffect } from "react";
import { Header } from "./Header";
import styles from "../Css/home.module.css";
import homeinmg from "../Img/secure.png";
import { Footer } from "./Footer";
import { Link } from "react-router-dom";
import { Navigate, redirect, useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  const token = JSON.parse(localStorage.getItem("token"));
  useEffect(() => {
    if (token) {
      navigate('/main')
      
    }
  }, []);
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
            <button className="btn btn ">
              <Link style={{textDecoration:"none" ,color:"white"}}to='/register'>
              sign up For Free</Link>
            </button>
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
