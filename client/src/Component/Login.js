import React, { useEffect, useState } from "react";
import { Header } from "./Header";
import styles from "../Css/login.module.css";
import Img from "../Img/login.png";
import { Footer } from "./Footer";
import axios from "axios";
import { Navigate, redirect, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
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
   await axios.post(`/api/auth/login`, {
      email: first.email,
      password: first.password,
    }).then((res)=>{
      console.log(res.data.token);
      localStorage.setItem("token",JSON.stringify(res.data.token))
         navigate("/main");
     toast.success(`Welcome ${res.data.user.firstname}`);


    }).catch((e)=>{
     toast.error(e.response.data);
    })
   
  };
  const forgetpassword=()=>{
    axios.post("/api/auth/forgetpassword").then(()=>{
      toast.info("Reset password link sent to register mail")
    })
  }

  function myFunction(id) {
    var x = document.getElementById(id);
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }
  return (
    <>
      <Header />
      <div className={styles.registersection}>
        <div className="container" style={{display:"flex",justifyContent:"center"}}>
          <div className={styles.loginbody}>

          <form onSubmit={handle}>
            <div className={styles.loginhead}>
          <h1>Login</h1>
              <div className={styles.loginright}>
                <div className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    id="email"
                    required
                    name="email"
                    placeholder="Email Address"
                    value={first.email}
                    onChange={(e) => {
                      setfirst({ ...first, [e.target.name]: e.target.value });
                    }}
                  />
                </div>

                <div className="form-group">
                <label
                          htmlFor="current_passwordi"
                          style={{ display: "flex", width: "inherit" }}
                        >

                  <input
                    className="form-control"
                    type="password"
                    id="floatingPassword"
                    required
                    name="password"
                    placeholder="Password"
                    value={first.password}
                    onChange={(e) => {
                      setfirst({ ...first, [e.target.name]: e.target.value });
                    }}
                    />
                      <i
                            id="floatingPassword"
                            className="mdi mdi-eye"
                            style={{ margin: "6px -31px" }}
                            onClick={(e)=>{
                              myFunction("floatingPassword")
                            }}
                          ></i>
                    </label>
                </div>

                <div className={styles.accbutton}>
                  <input
                    type="submit"
                    className={`btn btn-primary ${styles.loginbtn}`}
                    id="btn-createaccount"
                    value="Login"
                  />

                  <p>
                    <a style={{cursor:"pointer"}} onClick={forgetpassword} >Forget password ?</a>
                    {/* Don't have an account ?{" "}
                    <strong>
                      <a >Register Here</a>
                    </strong> */}
                    <br />
                  </p>
                </div>
                {/* <div className={styles.logincontent}>
                  <h3>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took button galley of type and scrambled it to make button
                    type specimen book.
                  </h3>
                </div> */}
              </div>
              {/* <div className={styles.loginright}>
                <img src={Img} alt="Login" />
              </div> */}
            </div>
          </form>
          </div>

        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
}

export default Login;
