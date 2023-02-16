import React, { useState } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import styles from "../Css/forgetpassword.module.css";
import axios from "axios";
import { useParams } from "react-router-dom";

export const Forgetpassword = () => {
    const params = useParams()
  const [data, setData] = useState({ password: "", confirmpassword: "" });
  const handle = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const submitform=(e)=>{
    e.preventDefault()
    axios.put(`/api/auth/password/reset/${params.token}`,{password:data.password,confirmpassword:data.confirmpassword})
  }
  console.log(params.token);
  return (
    <>
      <Header />
      <div className={`${styles.Forgetpasswordtop} container`}>
        <form onSubmit={submitform}>
          <div class="form-group">
            <label for="exampleInputEmail1">Password</label>
            <input
              type="password"
              name="password"
              onChange={handle}
              class="form-control"
              value={data.password}
              aria-describedby="emailHelp"
            />
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Confirm Password</label>
            <input
              type="password"
              name="confirmpassword"
              onChange={handle}
              value={data.confirmpassword}
              class="form-control"
            />
          </div>
          <button type="submit" class="btn btn-primary mt-2">
            Submit
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};
