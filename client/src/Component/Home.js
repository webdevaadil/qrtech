import React, { useEffect } from "react";
import { Header } from "./Header";
import styles from "../Css/home.module.css";
import homeinmg from "../Img/secure.png";
import { Footer } from "./Footer";
import { Link } from "react-router-dom";
import { Navigate, redirect, useNavigate } from "react-router-dom";
import axios from "axios";

export const Home = () => {
  const navigate = useNavigate();

  const token = JSON.parse(localStorage.getItem("token"));
  useEffect(() => {
    if (token) {
      navigate('/main')
      
    }
  }, []);
  const forgetpassword=()=>{
    axios.post("/api/auth/forgetpassword")
  }
  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.baneerleft}>
            <h2 style={{ fontSize: "3rem" ,fontWeight: "bolder" ,color:"white", marginTop:"10px"}}>
              Organized and Secure
              <br />
              <p style={{  }}>Access to all your files</p>
            </h2>
            <button className="btn btn " style={{backgroundColor:"#B12C23",borderRadius:"32px"}}>
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
