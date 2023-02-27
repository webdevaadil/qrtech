import React, { useEffect, useState } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Loader } from "./Loader";
export const Result = () => {
  console.log(document.location.origin);
  const [datasss, setdatasss] = useState();

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
  const nav = useNavigate();
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
    console.log(datasss);
  };
  return (
    <>
      {!data ? (
        <Loader />
      ) : (
        <>
          <Header />

          <div class="container">
            <div class="power-tech">
              <div class="border-head">
                <div class="lebal-head">
                  {/* <img src="../assets/images/logo.jpg" class="img-responsive" alt="Logo"/>
                            <p>D-6 Kavi Nagar Industrial Area,<br/>Ghaziabad 201002- Delhi NCR</p> */}
                </div>
              </div>
              <div class="table-responsive border-slip">
                <table class="table table-bordered">
                  {data && (
                    <tbody>
                      <tr>
                        <th>PRODUCT TYPE</th>
                        <th>{data.Product_type}</th>
                      </tr>

                      <tr>
                        <th>S.O. NO.</th>
                        <th>{data.SONo_JobNo}</th>
                      </tr>
                      <tr>
                        <th>PRODUCT NAME</th>
                        <th>{data.Product_Name}</th>
                      </tr>
                      <tr>
                        <th>TYPE OF CONSTRUCTION</th>
                        <th>{data.Constructiontype}</th>
                      </tr>
                      <tr>
                        <th>Rating</th>
                        <th>{data.Rating}</th>
                      </tr>
                      <tr>
                        <th>Files</th>

                        <th>
                          {data.files.map((item, index) => {
                            console.log(item);
                            return (
                              <>
                                <a
                                  onClick={() => {
                                    downloadfile(item.originalname);
                                  }}
                                  style={{ color: "#337ab7" }}
                                >
                                  {item.originalname}
                                </a>
                                <br />
                              </>
                            );
                          })}
                        </th>
                      </tr>
                      <tr>
                        <th>Customer</th>
                        <th>Test</th>
                      </tr>
                    </tbody>
                  )}
                </table>
              </div>
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};
