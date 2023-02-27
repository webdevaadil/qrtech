import React, { useEffect, useState, useRef } from "react";
import styles from "../Css/Prosnalpage.module.css";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import QRCode from "react-qr-code";
import html2canvas from "html2canvas";
import { Loader } from "./Loader";
export const Prosnalpage = () => {
  console.log(document.location.origin);

  const divRef = useRef(null);
  const { id } = useParams();
  console.log(id);
  const [data, setdata] = useState();

  const getformdata = () => {
    axios.post("/api/auth/edit", { id: id }).then((res) => {
      console.log(res);
      setdata(res.data);
    });
  };
  useEffect(() => {
    getformdata();
  }, []);
  const downloadfile = (e) => {
    let id = data._id;
    const header = { responseType: "blob" };
    axios.post("/api/auth/files", { e, id }, header).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      console.log(response);
      link.setAttribute("download", e);
      document.body.appendChild(link);
      link.click();
    });
  };
  const handleDownloadClick = () => {
    html2canvas(divRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/jpg");
      const link = document.createElement("a");
      link.download = "my-image.jpg";
      link.href = imgData;
      link.click();
    });
  };
  const deletefile = (e) => {
    let id = data._id;
    console.log(e);
    axios.post("/api/auth/deletefile", { e, id }).then((response) => {
      console.log(response);
    getformdata();


    });
  };

  return (
 <>
 {!data ?(<Loader/>):(   <>
      <div class={`${styles.prosnaltop} row`}>
        <div class="col-lg-12">
          <div class="card ">
            <div class="card-header">
              <div class="row">
                <div class="col-md-4">
                  <h4 class="mt-2" className={styles.toptext}>Enquiries</h4>
                </div>
                <div class="col-md-8" style={{ textAlign: "end" }}>
                  {data && (
                    <Link
                      to={`/main/Prosnalpage/edit/${data._id}`}
                      class="btn btn-warning"
                    >
                      Edit
                    </Link>
                  )}
                  <Link to={`/main/viewlist`} class="btn btn-outline-dark">
                    Back{" "}
                  </Link>
                </div>
              </div>
            </div>
            <div class="card-body">
              <table class="table table-bordered table-centered mb-0">
                {data && (
                  <tbody>
                    <tr>
                      <th>Customer</th>
                      <td>{data.customer}</td>
                    </tr>
                    <tr>
                      <th>Product Type</th>
                      <td>{data.Product_type}</td>
                    </tr>
                   
                    <tr>
                      <th>S No. / Job No.</th>
                      <td>{data.SONo_JobNo}</td>
                    </tr>
                    <tr>
                      <th>Construction Type</th>
                      <td>{data.Constructiontype}</td>
                    </tr>
                    <tr>
                      <th>Rating</th>
                      <td>{data.Rating}</td>
                    </tr>
                    <tr>
                      <th>Dispatch Date</th>
                      <td>{data.DispatchDate}</td>
                    </tr>
                    <tr>
                      <th>Files</th>
                      <td>
                        {data.files.map((item, index) => {
                          console.log(item);
                          return (
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                              {item.originalname}
                              <div class="btn-group mb-2">
                                <button
                                  onClick={() => {
                                    downloadfile(item.originalname);
                                  }}
                                  class="btn btn-sm btn-primary"
                                >
                                  <i class="mdi mdi-download"></i>{" "}
                                </button>
                                {/* <button
                                  type="button"
                                  onClick={() => {
                                    deletefile(item.path);
                                  }}
                                  class="btn btn-sm btn-danger"
                                  onclick="confirmDelete(39)"
                                >
                                  <i class="mdi mdi-window-close"></i>{" "}
                                </button> */}
                              </div>
                            </li>
                          );
                        })}
                      </td>
                    </tr>
                    <tr>
                      <th>QR Code</th>

                      <td class={styles.qrtabhead}>
                        <div class={styles.qrtab} ref={divRef}>
                          {data && (
                            <QRCode
                              value={`${document.location.origin}/result/${data._id}`}
                              size={100}
                            />
                          )}
                        </div>
                        <button
                          className="btn btn-primary"
                          onClick={handleDownloadClick}
                        >
                          Download as Image
                        </button>
                        <div id="qr"> </div>
                      </td>
                    </tr>
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </div>
      </div>
    </>)}</>
  );
};
