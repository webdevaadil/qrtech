import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../Css/Viewlist.module.css";
import axios from "axios";
import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";
import { toast } from "react-toastify";
import { Pagination } from "./Pagination.js";
import { Loader } from "./Loader";

export const Viewlist = () => {
  const [data, setData] = useState([]);
  //
  const [coustmersearch, setCoustmersearch] = useState("");
  const [jobno, setJobno] = useState("");
  const [proname, setProname] = useState("");

  //
  const [user, setuser] = useState();
  const nav = useNavigate();

  const getacc = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    await axios
      .post("/api/auth/me", { token })
      .then((res) => {
        setuser(res.data.user);
      })
      .catch((error) => {
        console.log(error);
        localStorage.removeItem("token");
        nav("/");
      });
  };
  const getformdata = () => {
    axios("/api/auth/getalldata").then((res) => {
      console.log(res);
      setData(res.data);
    });
  };
  useEffect(() => {
    getformdata();
    getacc();
  }, []);
  const getdeletedata = (id) => {
    console.log(id);
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

 
    
    const filedata=res.data.map((m) => {
      const filesfil= m.files.map((item,index)=>{
        console.log(item);
        return item.originalname
      })
      console.log(filesfil);

   return {
        customer: m.customer,
        Product_type: m.Product_type,
        Product_Name: m.Product_Name,
        Constructiontype: m.Constructiontype,
        Rating: m.Rating,
        'Job no': m.SONo_JobNo,
        DispatchDate: m.DispatchDate,
        files: filesfil.join(" , ")
      };
    });
    console.log(filedata);
    const ws = XLSX.utils.json_to_sheet(filedata);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    console.log(excelBuffer);

    const datas = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(datas, "excel" + fileExtension);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(20);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  let currentRecords;
  if (data.length > 0) {
    currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);
  }

  const nPages = Math.ceil(data.length / recordsPerPage);
  // console.log(currentRecords);
  const resetform = (e) => {
    e.preventDefault();
    setCoustmersearch("");
    setJobno("");
    setProname("");
  };
  return (
    <>
      {!data ? (
        <Loader />
      ) : (
        <div class={`${styles.cardbody}`}>
          <div>
            <div class={`${styles.viewlisttop} col-12`}>
              <div class="col-sm-4">
                <h3 class={`${styles.breadpagetitle} header-title`}>
                  Enquiries
                </h3>
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
          <div
            class="row"
            style={{ boxShadow: "0 0 35px 0 rgb(154 161 171 / 60%" }}
          >
            <div
              class="col-sm-8 text-right"
              style={{ textAlign: "right ", width: "100%", paddingTop: "10px" }}
            >
              <Link
                to="/main/createnew"
                class="btn btn-success mb-3 "
                style={{ marginRight: "10px", backgroundColor: "#20421F" }}
              >
                <i class="mdi mdi-plus"></i> Add New
              </Link>
              <a
                onClick={() => {
                  downloadExcel(data);
                }}
                class="btn btn-primary mb-3 "
              >
                <i class="mdi mdi-download"></i> Download
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
                <button
                  onClick={resetform}
                  class="btn btn-outline-danger ml-1 d-flex"
                >
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
            {data.length > 0 ? (
              <Pagination
                nPages={nPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      )}
    </>
  );
};
