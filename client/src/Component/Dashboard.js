import React from "react";
import styles from "../Css/Dashboard.module.css";

export const Dashboard = () => {
  return (
    <div>
   
      <div class="row" style={{justifyContent:"flex-end"}}>
      <div class="page-title-box">
            <div class="page-title-right">
              <ol class="breadcrumb m-0">
                <li class="breadcrumb-item">
                  <button >Home</button>
                </li>
                <li class="breadcrumb-item active">Dashboard</li>
              </ol>
            </div>
            <h4 class="page-title">Seller Dashboard</h4>
          </div>
        <div class="col-xl-12 col-lg-12 order-lg-2 order-xl-1"></div>
        <div class={`${styles.card}`}>
          <div class="card-body">
            <h4 class={`${styles.headertitle} mt-2`}>Latest</h4>

            <div class={`${styles.tableresponsive}`}>
              <table class="table table-centered table-nowrap table-hover mb-0">
                <tbody>
                  <tr>
                    <td>
                      <h5 class={`${styles.tablefont} my-1`}>Test</h5>
                      <span class="text-muted font-13">Customer</span>
                    </td>
                    <td>
                      <h5 class={`${styles.tablefont} my-1`}>LT Panels</h5>
                      <span class="text-muted font-13">Type</span>
                    </td>
                    <td>
                      <h5 class={`${styles.tablefont} my-1`}>6135123123</h5>
                      <span class="text-muted font-13">PTI No.</span>
                    </td>
                    <td>
                      <h5 class={`${styles.tablefont} my-1`}>309498748474</h5>
                      <span class="text-muted font-13">Job No.</span>
                    </td>
                    <td>
                      <h5 class={`${styles.tablefont} my-1`}>EV Charger</h5>
                      <span class="text-muted font-13">Panel Name</span>
                    </td>
                    <td>
                      <h5 class={`${styles.tablefont} my-1`}>Indoor</h5>
                      <span class="text-muted font-13">Construction Type</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h5 class={`${styles.tablefont} my-1`}>XYZ</h5>
                      <span class="text-muted font-13">Customer</span>
                    </td>
                    <td>
                      <h5 class={`${styles.tablefont} my-1`}>LT Panels</h5>
                      <span class="text-muted font-13">Type</span>
                    </td>
                    <td>
                      <h5 class={`${styles.tablefont} my-1`}>3498747656</h5>
                      <span class="text-muted font-13">PTI No.</span>
                    </td>
                    <td>
                      <h5 class={`${styles.tablefont} my-1`}>12987398834286</h5>
                      <span class="text-muted font-13">Job No.</span>
                    </td>
                    <td>
                      <h5 class={`${styles.tablefont} my-1`}>LT Panel</h5>
                      <span class="text-muted font-13">Panel Name</span>
                    </td>
                    <td>
                      <h5 class={`${styles.tablefont} my-1`}>Indoor</h5>
                      <span class="text-muted font-13">Construction Type</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h5 class={`${styles.tablefont} my-1`}>ABHDG</h5>
                      <span class="text-muted font-13">Customer</span>
                    </td>
                    <td>
                      <h5 class={`${styles.tablefont} my-1`}>CSS</h5>
                      <span class="text-muted font-13">Type</span>
                    </td>
                    <td>
                      <h5 class={`${styles.tablefont} my-1`}>3817634876</h5>
                      <span class="text-muted font-13">PTI No.</span>
                    </td>
                    <td>
                      <h5 class={`${styles.tablefont} my-1`}>334239832</h5>
                      <span class="text-muted font-13">Job No.</span>
                    </td>
                    <td>
                      <h5 class={`${styles.tablefont} my-1`}>HT Panel</h5>
                      <span class="text-muted font-13">Panel Name</span>
                    </td>
                    <td>
                      <h5 class={`${styles.tablefont} my-1`}>Indoor</h5>
                      <span class="text-muted font-13">Construction Type</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h5 class={`${styles.tablefont} my-1`}>myPowerExperts</h5>
                      <span class="text-muted font-13">Customer</span>
                    </td>
                    <td>
                      <h5 class={`${styles.tablefont} my-1`}>HT Panels</h5>
                      <span class="text-muted font-13">Type</span>
                    </td>
                    <td>
                      <h5 class={`${styles.tablefont} my-1`}>947230427</h5>
                      <span class="text-muted font-13">PTI No.</span>
                    </td>
                    <td>
                      <h5 class={`${styles.tablefont} my-1`}>34562109127</h5>
                      <span class="text-muted font-13">Job No.</span>
                    </td>
                    <td>
                      <h5 class={`${styles.tablefont} my-1`}>
                        11KV HT Switchboard
                      </h5>
                      <span class="text-muted font-13">Panel Name</span>
                    </td>
                    <td>
                      <h5 class={`${styles.tablefont} my-1`}>Indoor</h5>
                      <span class="text-muted font-13">Construction Type</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
