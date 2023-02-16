import React, { useEffect, useState } from "react";
import styles from "../Css/Dashboard.module.css";
import axios from "axios";

export const Dashboard = () => {
  const [data, setData] = useState();

  const getformdata = () => {
    axios("/api/auth/getalldata").then((res) => {
      console.log(res);
      setData(res.data);
    });
  };
  useEffect(() => {
    getformdata();
  }, []);
  return (
    <div className={styles.dashboardtop}>
       
      <div class="row" style={{ justifyContent: "flex-end" }}>
      <div class={`page-title-box   ${styles.dashboardtopbox}`}>
          <div class="">
            <ol class="breadcrumb m-0">
              <li class="breadcrumb-item">
                <a>Home</a>
              </li>
              <li class="breadcrumb-item active">Dashboard</li>
            </ol>
          </div>
          <h4 class={`${styles.breadpagetitle}`}>Seller Dashboard</h4>
        </div>
        <div class="col-xl-12 col-lg-12 order-lg-2 order-xl-1"></div>
        
        <div class={`${styles.card}`}>
          <div class="card-body">
         
            <h4 class={`${styles.headertitle} mt-2`}>Latest</h4>

            <div class={`${styles.tableresponsive}`}>
              <table class="table table-centered table-nowrap table-hover mb-0">
                <tbody>
                  {data &&
                    data.map((item, index) => {
                      return (
                        <tr>
                          <td>
                            <h5 class={`${styles.tablefont} my-1`}>
                              {item.customer}
                            </h5>
                            <span class="text-muted font-13">Customer</span>
                          </td>
                          <td>
                            <h5 class={`${styles.tablefont} my-1`}>
                              {item.Product_type}
                            </h5>
                            <span class="text-muted font-13">Type</span>
                          </td>
                          <td>
                            <h5 class={`${styles.tablefont} my-1`}>
                              {item.PTI_No}
                            </h5>
                            <span class="text-muted font-13">PTI No.</span>
                          </td>
                          <td>
                            <h5 class={`${styles.tablefont} my-1`}>
                              {item.SONo_JobNo}
                            </h5>
                            <span class="text-muted font-13">Job No.</span>
                          </td>
                          <td>
                            <h5 class={`${styles.tablefont} my-1`}>
                              {item.Panel_name}
                            </h5>
                            <span class="text-muted font-13">Panel Name</span>
                          </td>
                          <td>
                            <h5 class={`${styles.tablefont} my-1`}>
                              {item.Constructiontype}
                            </h5>
                            <span class="text-muted font-13">
                              Construction Type
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};