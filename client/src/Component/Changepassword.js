import React, { useEffect, useState } from "react";
import styles from "../Css/Changepassword.module.css";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { Loader } from "./Loader";

export const Changepassword = () => {
  const [user, setuser] = useState();
  const [data, setdata] = useState({
    password: "",
    newpassword: "",
    confirmPassword: "",
    id: "",
  });
  const handle = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };
  console.log(data);
  const subform = (e) => {
    e.preventDefault();
    axios
      .post("/api/auth/updatePassword", { data, user })
      .then((res) => {
        console.log(res);
        toast.info("Update Successfully");
      })
      .catch((error) => {
        toast.error(error.response.data);
      });
  };
  const nav = useNavigate();
  const getacc = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    await axios
      .post("/api/auth/me", { token })
      .then((res) => {
        setuser(res.data.user);
      })
      .catch((error) => {
        console.log(error);
        localStorage.removeItem("token");
        nav("/");
      });
  };

  useEffect(() => {
    getacc();
  }, []);
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
      {!user ? (
        <Loader />
      ) : (
        <div className={`${styles.changepasswordtop}`}>
          <div class={"row"}>
            <div class="col-12">
              <div class="page-title-box">
                <div class={`${styles.pagetitleright}`}>
                  <ol class="breadcrumb m-0">
                    <li class="breadcrumb-item">
                      <a>Home</a>
                    </li>
                    <li class="breadcrumb-item active">Change Password</li>
                  </ol>
                </div>
                <h4 class={`${styles.pagetitle}`}>Change Password</h4>
              </div>
            </div>
          </div>
          <div
            class="row"
            style={{ boxShadow: "0 0 35px 0 rgb(154 161 171 / 60%" }}
          >
            <div class="col-12">
              <div class="card " style={{ border: "none" }}>
                <div class="card-body">
                  <form
                    class="form-horizontal"
                    onSubmit={subform}
                    enctype="multipart/form-data"
                  >
                    <div
                      class="card-header"
                      style={{ backgroundColor: "transparent" }}
                    >
                      <div class="row">
                        <div class="col-md-4">
                          <h4 class="mt-2">Password</h4>
                        </div>
                      
                      </div>
                    </div>
                    <div class="form-group mb-3">
                      <label for="current_password">Current Password</label>
                      <div class="input-group input-group-merge">
                        <label
                          htmlFor="current_passwordi"
                          style={{ display: "flex", width: "inherit" }}
                        >
                          <input
                            type="password"
                            id="floatingPassword"
                            name="password"
                            class="form-control "
                            autocomplete="off"
                            placeholder="Current Password"
                            required
                            onChange={handle}
                            className="form-control"
                            value={data.password}
                          />

                          <i
                            id="floatingPassword"
                            className="mdi mdi-eye"
                            style={{ margin: "20px -31px" }}
                            onClick={(e)=>{
                              myFunction("floatingPassword")
                            }}
                          ></i>
                        </label>
                        {/* <input
                          id="current_password"
                          type="password"
                          class="form-control "
                          name="password"
                          autocomplete="off"
                          placeholder="Current Password"
                          required
                          value={data.password}
                          onChange={handle}
                        />
                        <div class="input-group-append" data-password="false">
                          <div
                            class="input-group-text"
                            style={{ height: "40px" }}
                          >
                            <span class={`${styles.passwordeye}`}></span>
                          </div>
                        </div> */}
                      </div>
                    </div>

                    <div class="form-group mb-3">
                      <label for="new_password">New Password</label>
                      <div class="input-group input-group-merge">
                        <label
                          htmlFor="new_password"
                          style={{ display: "flex", width: "inherit" }}
                        >
                          <input
                            id="password"
                            type="password"
                            class="form-control "
                            name="newpassword"
                            autocomplete="off"
                            placeholder="New Password"
                            required
                            value={data.newpassword}
                            onChange={handle}
                          />

                          <i
                            id="new_password"
                            className="mdi mdi-eye"
                            style={{ margin: "20px -31px" }}
                            onClick={(e)=>{
                              myFunction("password")
                            }}
                          ></i>
                        </label>
                      </div>
                      {/* <label for="password">New Password</label>
                      <div class="input-group input-group-merge">
                        <input
                          id="password"
                          type="password"
                          class="form-control "
                          name="newpassword"
                          autocomplete="off"
                          placeholder="New Password"
                          required
                          value={data.newpassword}
                          onChange={handle}
                        />
                        <div class="input-group-append" data-password="false">
                          <div
                            class="input-group-text"
                            style={{ height: "40px" }}
                          >
                            <span class={`${styles.passwordeye}`}></span>
                          </div>
                        </div>
                      </div> */}
                    </div>

                    <div class="form-group mb-3">
                 
                      {/* <div class="input-group input-group-merge">
                        <input
                          id="password_confirmation"
                          type="password"
                          class="form-control "
                          name="confirmPassword"
                          autocomplete="off"
                          placeholder="Confirm New Password"
                          required
                          value={data.confirmPassword}
                          onChange={handle}
                        />
                        <div class="input-group-append" data-password="false">
                          <div
                            class="input-group-text"
                            style={{ height: "40px" }}
                          >
                            <span class={`${styles.passwordeye}`}></span>
                          </div>
                        </div>
                      </div> */}
                      <label for="current_password">Confirm New Password</label>
                      <div class="input-group input-group-merge">
                        <label
                          htmlFor="password_confirmation"
                          style={{ display: "flex", width: "inherit" }}
                        >
                          <input
                        id="password_confirmation"
                        type="password"
                        class="form-control "
                        name="confirmPassword"
                        autocomplete="off"
                        placeholder="Confirm New Password"
                        required
                        value={data.confirmPassword}
                        onChange={handle}
                          />

                          <i
                            id="current_password"
                            className="mdi mdi-eye"
                            style={{ margin: "20px -31px" }}
                            onClick={(e)=>{
                              myFunction("password_confirmation")
                            }}
                          ></i>
                        </label></div>
                    </div>

                    <div class="form-group mb-0 justify-content-end row text-right">
                      <div class="col-9" style={{ position: "relative" }}>
                        <i
                          class="mdi mdi-key"
                          style={{
                            position: "absolute",
                            top: "5px",
                            left: "18px",
                            color: "black",
                          }}
                        ></i>
                        <input
                          class="btn btn-warning btn-sm"
                          value="Update"
                          type="submit"
                          style={{ padding: "5px 8px 5px 24px" }}
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
