import React from "react";
import { Header } from "./Header";
import styles from "../Css/login.module.css";
import Img from "../Img/login.png";
import { Footer } from "./Footer";
function Login() {
  return (
    <>
      <Header />
      <div className={styles.registersection}>
        <div className="container">
          <h1>Login</h1>
          <form
            method="POST"
            action="http://3.109.219.236/login"
            id="loginForm"
          >
            <div className={styles.loginhead}>
              <div className={styles.loginright}>
                <div className="form-group">
                  <input
                  className="form-control"
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email Address"
                    value=""
                  />
                </div>

                <div className="form-group">
                  <input
                   className="form-control"
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                  />
                </div>

                <div className={styles.accbutton}>
                  <button type="submit" className={`btn btn-primary ${styles.loginbtn}`} id="btn-createaccount" form="loginForm">
                    Login
                  </button>
                  <p>
                    Don't have an account ?{" "}
                    <strong>
                      <a href="http://3.109.219.236/register">Register Here</a>
                    </strong>
                    <br />
                    <a href="http://3.109.219.236/forget-password">
                      Forget password ?
                    </a>
                  </p>
                </div>
                <div className={styles.logincontent}>
                  <h3>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book.
                  </h3>
                </div>
              </div>
              <div className={styles.loginright}>
                <div>
                  <img src={Img} alt="Login" />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default Login;
