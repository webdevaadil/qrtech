import React, { useEffect, useState } from "react";
import styles from "../Css/Account.module.css";
import img from "../Img/accountimg.png";
import axios from "axios";

export const Account = () => {
  const [user, setuser] = useState();
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
  console.log(user);
  useEffect(() => {
    getacc();
  }, []);

  const handle = (e) => {
    setuser({ ...user, [e.target.name]: e.target.value });
  };
  const updatedata = async (e) => {
    e.preventDefault();
    const data = await axios.post("/api/auth/updateprofile", user);
    console.log(data);
  };

  const setimg = async (e) => {
    if (e.target.name === "profilepic") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setuser({ ...user, ["profilepic"]: reader.result });
          // setavatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  return (
    <>
      {user ? (
        <div className={`${styles.accounttop}`}>
          <div class="row">
            <div class="col-12">
              <div class="page-title-box">
                <div class={`${styles.pagetitleright}`}>
                  <ol class="breadcrumb m-0">
                    <li class="breadcrumb-item">
                      <a>Home</a>
                    </li>
                    <li class="breadcrumb-item">Settings</li>
                    <li class="breadcrumb-item active">My Account</li>
                  </ol>
                </div>
                <h4 class={`${styles.pagetitle}`}>My Account</h4>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <form onSubmit={updatedata}>
                <div class="card border-dark border">
                  <div class="card-header">
                    <div class="row">
                      <div class="col-md-4">
                        <h4 class="mt-2">My Account</h4>
                      </div>
                      <div class={`col-md-8 ${styles.textright}`}>
                        <a class="btn btn-dark btn-sm">Back </a>
                          <i class="mdi mdi-content-save btn btn-warning btn-sm">
                          <input class="btn btn-warning btn-sm"value="Update" type="submit" />
                            </i>{" "}
                      </div>
                    </div>
                  </div>
                  <div class="card-body">
                    <div class="form-group row mb-3">
                      <label for="name" class="col-3">
                        Firstname
                      </label>
                      <div class="col-9">
                        <input
                          type="text"
                          id="firstname"
                          name="firstname"
                          class="form-control"
                          defaultValue={user.firstname}
                          onChange={handle}
                        />
                      </div>
                    </div>
                    <div class="form-group row mb-3">
                      <label for="name" class="col-3">
                        Lastname
                      </label>
                      <div class="col-9">
                        <input
                          type="text"
                          id="lastname"
                          name="lastname"
                          class="form-control"
                          defaultValue={user.lastname}
                          onChange={handle}
                        />
                      </div>
                    </div>

                    <div class="form-group row mb-3">
                      <label for="email" class="col-3">
                        Email
                      </label>
                      <div class="col-9">
                        <input
                          type="email"
                          id="email"
                          name="email"
                          class="form-control"
                          placeholder="Email"
                          defaultValue={user.email}
                          onChange={handle}
                        />
                      </div>
                    </div>

                    <div class="form-group row mb-3">
                      <label for="mobile" class="col-3">
                        Telephone
                      </label>
                      <div class="col-9">
                        <input
                          type="number"
                          id="mobile"
                          name="telephone"
                          class="form-control"
                          defaultValue={user.telephone}
                          onChange={handle}
                        />
                      </div>
                    </div>

                    <div class="form-group row mb-3">
                      <label for="avatar" class="col-3 col-form-label">
                        Profile Picture
                      </label>
                      <div class="col-9">
                        <div class="input-group">
                          <div class="custom-file">
                            <input
                              type="file"
                              class="custom-file-input"
                              id="avatar"
                              name="profilepic"
                              onChange={setimg}
                            />
                            <label class="custom-file-label" for="avatar">
                              Choose Image
                            </label>
                          </div>
                        </div>
                        <img
                          id="preview_img"
                          src={user.profilepic}
                          class="mt-2"
                          width="150"
                          height="150"
                        />
                      </div>
                    </div>

                    <div class="form-group mb-0 justify-content-end row text-right">
                      <div class="col-9">
                        <button
                          type="accountForm"
                          class="btn btn-warning btn-sm"
                          form="accountForm"
                        >
                          <i class="mdi mdi-content-save btn btn-warning btn-sm">
                          <input class="btn btn-warning btn-sm"value="Update" type="submit" />
                            </i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
