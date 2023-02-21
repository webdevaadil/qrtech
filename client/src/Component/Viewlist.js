import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../Css/Viewlist.module.css";
import axios from "axios";
import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";
import { toast } from "react-toastify";
import { Pagination } from "./Pagination.js";

export const Viewlist = () => {
  const [data, setData] = useState([]);
  //
  const [coustmersearch, setCoustmersearch] = useState("");
  const [jobno, setJobno] = useState("");
  const [proname, setProname] = useState("");

  //
  const getformdata = () => {
    axios("/api/auth/getalldata").then((res) => {
      console.log(res);
      setData(res.data);
    });
  };
  useEffect(() => {
    getformdata();
  }, []);
  const getdeletedata = (id) => {
    axios.post("/api/auth/delete", { id: id }).then((res) => {
      console.log(res);
      setData(res.data);
      getformdata();
      toast.info("Delete Successfully");
    });
  };
  useEffect(() => {
    getformdata();
  }, []);
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";
  const downloadExcel = async (data) => {
    const res = await axios("/api/auth/downloadexcel");

    const ws = XLSX.utils.json_to_sheet(res.data);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    console.log(excelBuffer);

    const datas = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(datas, "excel" + fileExtension);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(2);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(data.length / recordsPerPage);
  // console.log(currentRecords);

  return (
    <div class={`${styles.cardbody}`}>
      <div>
        <div class={`${styles.viewlisttop} col-12`}>
          <div class="col-sm-4">
            <h3 class={`${styles.breadpagetitle} header-title`}>Enquiries</h3>
          </div>
          <div class="page-title-box">
            <div class="page-title-right">
              <ol class="breadcrumb m-0">
                <li class="breadcrumb-item">
                  <a>Home</a>
                </li>
                <li class="breadcrumb-item active">Enquires</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div class="row" style={{boxShadow:"0 0 35px 0 rgb(154 161 171 / 60%"}}>
        <div class="col-sm-8 text-right" style={{ textAlign: "right " ,width:"100%" }}>
          <Link to="/main/createnew" class="btn btn-success mb-3">
            <i class="mdi mdi-plus"></i> Add New
          </Link>
          <a
            onClick={() => {
              downloadExcel(data);
            }}
            class="btn btn-primary mb-3"
          >
            <i class="mdi mdi-plus"></i> download
          </a>
        </div>
        <form class={`${styles.seachfeilds} form-inline mb-2`}>
          <div class="form-group mr-1">
            <div class="input-group">
              <input
                placeholder="Search by Customer"
                type="text"
                class="form-control"
                id="filter_name"
                name="customer"
                value={coustmersearch}
                onChange={(e) => {
                  setCoustmersearch(e.target.value);
                }}
              />
            </div>
          </div>
          <div class="form-group mr-1">
            <div class="input-group">
              <input
                placeholder="Search by Job No. & S.O No"
                type="text"
                class="form-control"
                id="filter_job"
                name="SONo_JobNo"
                value={jobno}
                onChange={(e) => {
                  setJobno(e.target.value);
                }}
              />
            </div>
          </div>
          <div class="form-group">
            <div class="input-group">
              <input
                placeholder="Search by Product Name"
                type="text"
                class="form-control"
                id="filter_pti"
                name="Product_Name"
                onChange={(e) => {
                  setProname(e.target.value);
                }}
                value={proname}
              />
            </div>
          </div>
          <div class="form-group">
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
                <th>Product Name.</th>
                <th>Job No.</th>
                <th>Construction Type</th>
                <th class="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0
                ? currentRecords
                    .filter((value) => {
                      return `${value.customer} `
                        .toLowerCase()
                        .match(coustmersearch.toLowerCase());
                    })
                    .filter((value) => {
                      return ` ${value.SONo_JobNo} `
                        .toLowerCase()
                        .match(jobno.toLowerCase());
                    })
                    .filter((value) => {
                      return `${value.Product_Name}`
                        .toLowerCase()
                        .match(proname.toLowerCase());
                    })
                    .map((item, index) => {
                      console.log(item);
                      return (
                        <tr>
                          <td># {index + 1}</td>
                          <td>{item.customer}</td>
                          <td>{item.Product_type}</td>
                          <td>{item.Product_Name}</td>
                          <td>{item.SONo_JobNo}</td>
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
                : ""}
            </tbody>
          </table>
        </div>
        <div class="col-sm-12"></div>
      <Pagination
        nPages={nPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      </div>
    </div>
  );
};
