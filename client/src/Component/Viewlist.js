import React from "react";
import { Link } from "react-router-dom";
import styles from "../Css/dashboard.module.css";

export const Viewlist = () => {

  return (
    <div class={`${styles.cardbody}`}>
      <div class="row">
        <div class="col-sm-4">
          <h3 class="header-title">Enquiries</h3>
        </div>

        <div class="col-sm-8 text-right" style={{ textAlign: "right " }}>
          <Link to="/main/createnew" class="btn btn-success mb-3">
            <i class="mdi mdi-plus"></i> Add New
          </Link >
        </div>
        <form class={`${styles.seachfeilds} form-inline mb-2`}>
          <div class="form-group mr-1">
            <div class="input-group">
              <input
                placeholder="Search by Customer"
                type="text"
                class="form-control"
                id="filter_name"
                name="filter_name"
                value=""
              />
            </div>
          </div>
          <div class="form-group mr-1">
            <div class="input-group">
              <input
                placeholder="Search by Job No"
                type="text"
                class="form-control"
                id="filter_job"
                name="filter_job"
                value=""
              />
            </div>
          </div>
          <div class="form-group">
            <div class="input-group">
              <input
                placeholder="Search by PTI No"
                type="text"
                class="form-control"
                id="filter_pti"
                name="filter_pti"
                value=""
              />
            </div>
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-outline-primary ml-2 ">
              Submit
            </button>
            <button class="btn btn-outline-danger ml-1">
              <i class="mdi mdi-autorenew"></i> Reset
            </button>
          </div>
        </form>
        <div class="table-responsive">
          <table class="table table-hover table-centered datatable datatable-ProductCategory">
            <thead class={`${styles.theaddark} `}>
              <tr>
                <th>Ref</th>
                <th>Customer Name</th>
                <th>Product Type</th>
                <th>PTI No.</th>
                <th>Job No.</th>
                <th>Panel Name</th>
                <th>Construction Type</th>
                <th class="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td># 23</td>
                <td>Test</td>
                <td>LT Panels</td>
                <td>6135123123</td>
                <td>309498748474</td>
                <td>EV Charger</td>
                <td>Indoor</td>
                <td class="table-action text-center">
                  <button
                    class="btn btn-primary"
                  >
                    <i class="mdi mdi-eye-outline"></i>{" "}
                  </button>
                  <button
                    class="btn btn-warning"
                  >
                    <i class="mdi mdi-pencil"></i>{" "}
                  </button>
                  <button
                    type="button"
                    onclick="confirmDelete(23)"
                    class="btn btn-danger"
                  >
                    <i class="mdi mdi-delete"></i>{" "}
                  </button>
                  <form
                    id="delete-form23"
                    method="POST"
                  ></form>
                </td>
              </tr>
              <tr>
                <td># 22</td>
                <td>XYZ</td>
                <td>LT Panels</td>
                <td>3498747656</td>
                <td>12987398834286</td>
                <td>LT Panel</td>
                <td>Indoor</td>
                <td class="table-action text-center">
                  <button
                    class="btn btn-primary"
                  >
                    <i class="mdi mdi-eye-outline"></i>{" "}
                  </button>
                  <button
                    class="btn btn-warning"
                  >
                    <i class="mdi mdi-pencil"></i>{" "}
                  </button>
                  <button
                    type="button"
                    onclick="confirmDelete(22)"
                    class="btn btn-danger"
                  >
                    <i class="mdi mdi-delete"></i>{" "}
                  </button>
                </td>
              </tr>
              <tr>
                <td># 19</td>
                <td>ABHDG</td>
                <td>CSS</td>
                <td>3817634876</td>
                <td>334239832</td>
                <td>HT Panel</td>
                <td>Indoor</td>
                <td class="table-action text-center">
                  <button
                    class="btn btn-primary"
                  >
                    <i class="mdi mdi-eye-outline"></i>{" "}
                  </button>
                  <button
                    class="btn btn-warning"
                  >
                    <i class="mdi mdi-pencil"></i>{" "}
                  </button>
                  <button
                    type="button"
                    onclick="confirmDelete(19)"
                    class="btn btn-danger"
                  >
                    <i class="mdi mdi-delete"></i>{" "}
                  </button>
                </td>
              </tr>
              <tr>
                <td># 8</td>
                <td>myPowerExperts</td>
                <td>HT Panels</td>
                <td>947230427</td>
                <td>34562109127</td>
                <td>11KV HT Switchboard</td>
                <td>Indoor</td>
                <td class="table-action text-center">
                  <button
                    class="btn btn-primary"
                  >
                    <i class="mdi mdi-eye-outline"></i>{" "}
                  </button>
                  <button
                    class="btn btn-warning"
                  >
                    <i class="mdi mdi-pencil"></i>{" "}
                  </button>
                  <button
                    type="button"
                    onclick="confirmDelete(8)"
                    class="btn btn-danger"
                  >
                    <i class="mdi mdi-delete"></i>{" "}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="col-sm-12"></div>
      </div>
      
    </div>
  );
};
