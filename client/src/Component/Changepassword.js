import React, { useEffect, useState } from "react";
import styles from "../Css/Changepassword.module.css";
import axios from "axios";
import { toast } from "react-toastify";

export const Changepassword = () => {
  const [user, setuser] = useState();
  const [data, setdata] = useState({
    password: "",
    newpassword: "",
    confirmPassword: "",
    id:""
  });
  const handle = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };
  console.log(data);
  const subform=(e)=>{
    e.preventDefault()
    axios.post('/api/auth/updatePassword',{data,user}).then((res)=>{
      console.log(res)
    }).catch((error)=>{
      toast.error(error.response.data);
    })
  }
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
      });
  };

  useEffect(() => {
    getacc();
  }, []);
  return (
    <>
      <div className={`${styles.changepasswordtop}`}>
        <div class={"row"}>
          <div class="col-12">
            <div class="page-title-box">
              <div class={`${styles.pagetitleright}`}>
                <ol class="breadcrumb m-0">
                  <li class="breadcrumb-item">
                    <a>Home</a>
                  </li>
                  <li class="breadcrumb-item">Settings</li>
                  <li class="breadcrumb-item active">Change Password</li>
                </ol>
              </div>
              <h4 class={`${styles.pagetitle}`}>Change Password</h4>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <div class="card border-dark border">
              <div class="card-header">
                <div class="row">
                  <div class="col-md-4">
                    <h4 class="mt-2">Password</h4>
                  </div>
                  <div class="col-md-8 " style={{ textAlign: "right" }}>
                    <a class="btn btn-dark btn-sm">Back </a>
                    <button
                      type="submit"
                      class="btn btn-warning btn-sm"
                      form="passwordForm"
                    >
                      <i class="mdi mdi-key"></i> Update{" "}
                    </button>
                  </div>
                </div>
              </div>
              <div class="card-body">
                <form
                  class="form-horizontal"
                  onSubmit={subform}
                  enctype="multipart/form-data"
                >
                  <div class="form-group mb-3">
                    <label for="current_password">Current Password</label>
                    <div class="input-group input-group-merge">
                      <input
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
                        <div class="input-group-text">
                          <span class={`${styles.passwordeye}`}></span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="form-group mb-3">
                    <label for="password">New Password</label>
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
                        <div class="input-group-text">
                          <span class={`${styles.passwordeye}`}></span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="form-group mb-3">
                    <label for="password_confirmation">
                      Confirm New Password
                    </label>
                    <div class="input-group input-group-merge">
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
                        <div class="input-group-text">
                          <span class={`${styles.passwordeye}`}></span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="form-group mb-0 justify-content-end row text-right">
                    <div class="col-9">
                      <button
                        type="submit"
                        class="btn btn-warning btn-sm"
                        form="passwordForm"
                      >
                        <i class="mdi mdi-key">
                          <input
                            class="btn btn-warning btn-sm"
                            value="Update"
                            type="submit"
                          />
                        </i>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
