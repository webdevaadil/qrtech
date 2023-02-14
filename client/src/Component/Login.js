import React, { useEffect, useState } from "react";
import { Header } from "./Header";
import styles from "../Css/login.module.css";
import Img from "../Img/login.png";
import { Footer } from "./Footer";
import axios from "axios";
import { Navigate, redirect, useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate();
  const [first, setfirst] = useState({ email: "", password: "" });
  const baseurl = "http://localhost:5000";

  const token = JSON.parse(localStorage.getItem("token"));
useEffect(() => {
  if (token) {
    navigate('/main')
    
  }
}, []);


  const handle = async (e) => {

    e.preventDefault();
    console.log(first);
   await axios.post(`${baseurl}/api/auth/login`, {
      email: first.email,
      password: first.password,
    }).then((res)=>{
      console.log(res.data.token);
      localStorage.setItem("token",JSON.stringify(res.data.token))
         navigate("/main");

    }).catch((e)=>{
     alert(e.response.data);
    })
    // try {
    // } catch (error) {
    //   alert();
    // }

    // if (data.data.success===true) {
    //   navigate("/home")

    // }
    // if(data.response.status !== 200){

    // }
    // .then(navigate("/home"))
  };
  return (
    <>
      <Header />
      <div className={styles.registersection}>
        <div className="container">
          <h1>Login</h1>
          <form onSubmit={handle}>
            <div className={styles.loginhead}>
              <div className={styles.loginright}>
                <div className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    id="email"
                    name="email"
                    placeholder="Email Address"
                    value={first.email}
                    onChange={(e) => {
                      setfirst({ ...first, [e.target.name]: e.target.value });
                    }}
                  />
                </div>

                <div className="form-group">
                  <input
                    className="form-control"
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    value={first.password}
                    onChange={(e) => {
                      setfirst({ ...first, [e.target.name]: e.target.value });
                    }}
                  />
                </div>

                <div className={styles.accbutton}>
                  <input
                    type="submit"
                    className={`btn btn-primary ${styles.loginbtn}`}
                    id="btn-createaccount"
                    value="Login"
                  />

                  <p>
                    Don't have an account ?{" "}
                    <strong>
                      <a >Register Here</a>
                    </strong>
                    <br />
                    <a >Forget password ?</a>
                  </p>
                </div>
                <div className={styles.logincontent}>
                  <h3>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took button galley of type and scrambled it to make button
                    type specimen book.
                  </h3>
                </div>
              </div>
              <div className={styles.loginright}>
                <img src={Img} alt="Login" />
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;
