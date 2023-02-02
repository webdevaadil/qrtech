import React from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import img from "../Img/signup.png";
import styles from "../Css/register.module.css";

export const Register = () => {
  return (
    <>
      <Header />
      <div class="register-section">
        <div class="container">
          <h1>Create A Seller Account</h1>
          <form method="POST" id="signupForm">
            <div className={styles.formhead}>
              <div className={styles.formfield}>
                <div class=" ">
                  <div class="form-group ">
                    <input
                      type="text"
                      class="form-control"
                      id="firstname"
                      name="firstname"
                      placeholder="First name"
                      value=""
                    />
                  </div>
                  <div class="form-group ">
                    <input
                      type="text"
                      class="form-control"
                      id="lastname"
                      name="lastname"
                      placeholder="Last Name"
                      value=""
                    />
                  </div>
                </div>
                <div class="form-group col-sm-12">
                  <input
                    type="email"
                    class="form-control"
                    id="email"
                    name="email"
                    placeholder="Email Address"
                    value=""
                  />
                </div>

                <div class="form-group col-sm-12">
                  <input
                    type="number"
                    class="form-control mb-2 inptFielsd"
                    id="mobile"
                    name="mobile"
                    placeholder="Mobile Number"
                    value=""
                  />
                </div>

                <p class="mailing-address">Seller Mailing Address</p>
                <div class="form-group col-sm-12">
                  <input
                    type="text"
                    class="form-control"
                    id="business_name"
                    name="business_name"
                    placeholder="Company Name"
                    value=""
                  />
                </div>
                <div class="form-group col-sm-12">
                  <input
                    type="text"
                    class="form-control"
                    id="address_1"
                    name="address_1"
                    placeholder="Street Address"
                    value=""
                  />
                </div>
                <div class="form-group col-sm-12">
                  <input
                    type="text"
                    class="form-control"
                    id="address_2"
                    name="address_2"
                    placeholder="Street Address Line 2"
                    value=""
                  />
                </div>
                <div class="form-row">
                  <div class="form-group ">
                    <input
                      type="text"
                      class="form-control"
                      id="city"
                      name="city"
                      placeholder="City"
                      value=""
                    />
                  </div>
                  <div class="form-group ">
                    <input
                      type="text"
                      class="form-control"
                      id="state"
                      name="state"
                      placeholder="State / Province"
                      value=""
                    />
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group ">
                    <input
                      type="text"
                      class="form-control"
                      id="zipcode"
                      name="zipcode"
                      placeholder="Postal / Zip Code"
                      value=""
                    />
                  </div>
                  <div class="form-group ">
                    <select
                      type="text"
                      class="form-control"
                      id="country"
                      name="country"
                    >
                      <option class="India">India</option>
                    </select>
                  </div>
                </div>

                <label id="label-2">
                  Your mobile number will be verified for unique QR code
                </label>
                <div class="form-group col-sm-12">
                  <input
                    type="password"
                    class="form-control"
                    id="password"
                    name="password"
                    placeholder="Password"
                  />
                </div>
                <div class="form-group col-sm-12">
                  <input
                    type="password"
                    class="form-control"
                    id="password_confirmation"
                    name="password_confirmation"
                    placeholder="Confirm Password"
                  />
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <div class="checkbox-section">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value="accepted"
                        id="invalidCheck"
                        name="terms"
                      />
                      <label class="form-check-label">
                        I agree to Repslips <span> T&amp;C </span>
                      </label>
                    </div>
                  </div>
                </div>
                <div class="account-button text-center">
                  <button
                    type="submit"
                    class="btn btn-primary"
                    id="btn-createaccount"
                    form="signupForm"
                  >
                    Create an Account
                  </button>
                  <p>
                    Already have an account.?{" "}
                    <strong>
                      <a href="">Login</a>
                    </strong>
                  </p>
                </div>
              </div>
              <div class=" register-img">
                <div class="image-block">
                  <img src={img} class="img-responsive" alt="Sign Up" />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};
