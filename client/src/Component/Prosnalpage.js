import React, { useEffect, useState } from "react";
import styles from "../Css/Prosnalpage.module.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import QRCode from 'react-qr-code';
export const Prosnalpage = () => {
    console.log(document.location.origin);
    const [datasss, setdatasss] = useState();
    
  const { id } = useParams();
  console.log(id);
  const [data, setdata] = useState();

  const getformdata = () => {
    axios
      .post("http://192.168.1.73:5000/api/auth/edit", { id: id })
      .then((res) => {
        console.log(res);
        setdata(res.data);
      });
  };
  useEffect(() => {
    getformdata();
  }, []);
  const nav =useNavigate()
  const downloadfile=(e)=>{
    let id = data._id
    const header={responseType: 'blob'}
axios.post("http://192.168.1.73:5000/api/auth/files",{e,id},header).then((response)=>{
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    console.log(response);
    link.setAttribute('download', e);
    document.body.appendChild(link);
    link.click();
})
console.log(datasss);
  }
  return (
    <>
      <div class={`${styles.prosnaltop} row`}>
        <div class="col-lg-12">
          <div class="card border-info border">
            <div class="card-header">
              <div class="row">
                <div class="col-md-4">
                  <h4 class="mt-2">Enquiries</h4>
                </div>
                <div class="col-md-8 text-right">
                  <a class="btn btn-warning">Edit</a>
                  <a class="btn btn-outline-dark">Back </a>
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
                      <th>PTI No</th>
                      <td>{data.PTI_No}</td>
                    </tr>
                    <tr>
                      <th>S No. / Job No.</th>
                      <td>{data.SONo_JobNo}</td>
                    </tr>
                    <tr>
                      <th>Panel Name</th>
                      <td>{data.Panel_name}</td>
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
                        {data.files.map((item,index)=>{
                            console.log(item);
                            return(
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                          {item.originalname}
                          <div class="btn-group mb-2">
                            <button onClick={()=>{downloadfile(item.originalname)}} class="btn btn-sm btn-primary">
                              <i class="mdi mdi-download" ></i>{" "}
                            </button>
                            <button
                              type="button"
                              class="btn btn-sm btn-danger"
                              onclick="confirmDelete(39)"
                              >
                              <i class="mdi mdi-window-close"></i>{" "}
                            </button>
                          </div>
                        </li>)
                        })}
                       
                      </td>
                    </tr>
                    <tr>
                      <th>QR Code</th>

                      <td>
                      {data && (
          <QRCode
            value={`${document.location.origin}/result/${data._id}`}
            size={100}
          />
        )}

                        <button class="btn btn-primary mt-3" o>
                          {" "}
                          Download
                        </button>
                      </td>
                    </tr>
                  </tbody>
                )}
              </table>
            </div>
          </div>
            
        </div>
      </div>
    </>
  );
};
