import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../Css/Viewlist.module.css";
import axios from "axios";

export const Viewlist = () => {
  const [data, setData] = useState([]);

  const getformdata = () => {
    axios("http://192.168.1.73:5000/api/auth/getalldata")
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
  };
  useEffect(() => {
    getformdata();
  }, []);
  const getdeletedata = (id) => {
    axios
      .post("http://192.168.1.73:5000/api/auth/delete", { id: id })
      .then((res) => {
        console.log(res);
        setData(res.data);
        getformdata()
        console.log();
      })
  };
  useEffect(() => {
    getformdata();
  }, []);

  console.log(data);
  return (
    <div class={`${styles.cardbody}`}>
      <div class="row">
        <div class="col-sm-4">
          <h3 class="header-title">Enquiries</h3>
        </div>

        <div class="col-sm-8 text-right" style={{ textAlign: "right " }}>
          <Link to="/main/createnew" class="btn btn-success mb-3">
            <i class="mdi mdi-plus"></i> Add New
          </Link>
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
          <table
            style={{ textAlign: "center" }}
            class="table table-hover table-centered datatable datatable-ProductCategory"
          >
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
              {data.length > 0 ?(

                
                data.map((item, index) => {
                  console.log(item);
                  return (
                    <tr>
                      <td># {index + 1}</td>
                      <td>{item.customer}</td>
                      <td>{item.Product_type}</td>
                      <td>{item.PTI_No}</td>
                      <td>{item.SONo_JobNo}</td>
                      <td>{item.Panel_name}</td>
                      <td>{item.Constructiontype}</td>
                      <td class="table-action text-center">
                        <Link
                          to={`/main/Prosnalpage/${item._id}`}
                          class="btn btn-primary"
                          >
                          <i class="mdi mdi-eye-outline"></i>{" "}
                        </Link>
                        <Link
                          to={`/main/Prosnalpage/edit/${item._id}`}
                          class="btn btn-warning"
                        >
                          <i class="mdi mdi-pencil"></i>{" "}
                        </Link>
                        <button
                          onClick={() => {
                            getdeletedata(item._id);
                          }}
                          type="button"
                          onclick="confirmDelete(23)"
                          class="btn btn-danger"
                          >
                          <i class="mdi mdi-delete"></i>{" "}
                        </button>
                        <form id="delete-form23" method="POST"></form>
                      </td>
                    </tr>
                  );
                })
                ):("")
              }
            </tbody>
          </table>
        </div>
        <div class="col-sm-12"></div>
      </div>
    </div>
  );
};
