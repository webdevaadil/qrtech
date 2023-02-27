import axios from "axios";
import styles from "../Css/Createnew.module.css";

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Select from "react-select";
import { Link } from "react-router-dom";

export const Createnew = () => {
  const [file, setFile] = useState([]);
  const [formDatas, setFormData] = useState({
    customer: "",
    Product_type: "",
    SONo_JobNo: "",
    Product_Name: "",
    Constructiontype: "",
    Rating: "",
    DispatchDate: "",
    files: "",
  });
  const [producttype, setproducttype] = useState();
  const [contructiontype, setcontructiontype] = useState();

  const handleChange = (e) => {
    setFormData({
      ...formDatas,
      [e.target.name]: e.target.value,
    });
  };
  const handleFileChange = (e) => {
    setFile(e.target.files);
  };
  const handle = async (e) => {
    setproducttype(e.value);
  };
  const constructionhandle = async (e) => {
    setcontructiontype(e.value);
  };
  const submitfoam = async (e) => {
    e.preventDefault();
    console.log(file.length);

    const formData = new FormData();

    formData.append("customer", formDatas.customer);
    formData.append("Product_type", producttype);
    formData.append("SONo_JobNo", formDatas.SONo_JobNo);
    formData.append("Product_Name", formDatas.Product_Name);
    formData.append("Constructiontype", contructiontype);
    formData.append("Rating", formDatas.Rating);
    formData.append("DispatchDate", formDatas.DispatchDate);
    for (let index = 0; index < file.length; index++) {
      formData.append("img", file[index]);
    }
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    await axios
      .post("/api/auth/foamdata", formData)
      .then((res) => {
        toast.success(res.data.message);
        setFormData({
          customer: "",
          Product_type: "",
          SONo_JobNo: "",
          Product_Name: "",
          Constructiontype: "",
          Rating: "",
          DispatchDate: "",
          files: "",
        });
        setFile("");
      })
      .catch((res) => {
        toast.error(res.data.message);
      });
  };
  const options = [
    {
      value: "HT Panels",
      label: "HT Panels",
    },
    {
      value: "LT panels",
      label: "LT panels",
    },
    {
      value: "CSS",
      label: "CSS",
    },
    {
      value: "AC Charger",
      label: "AC Charger",
    },
    {
      value: "DC Charger",
      label: "DC Charger",
    },
    {
      value: "Other Product",
      label: "Other Product",
    },
  ];
  const Conoptions = [
    {
      value: "Indoor",
      label: "Indoor",
    },
    {
      value: "Outdoor",
      label: "Outdoor",
    },
  ];
  const customStyles = {
    height: 45,
    zIndex: -999,
  };
  return (
    <>
      <div className={styles.creteHead}>
        <div class="row">
          <div class="col-12">
            <div class="card">
              <div class="card-header">
                <div class="row mb-3">
                  <div class="col-md-4">
                    <h4 class="mt-2" className={styles.title}>Create Enquiry</h4>
                  </div>
                  <div class="col-md-8" style={{ textAlign: "right",marginTop:"auto" }}>
                    <Link
                      to={`/main/viewlist`}
                      class="btn btn-outline-dark"
                      style={{ height: "30px", padding: "2px 10px" }}
                    >
                      Back{" "}
                    </Link>
                    {/* <i
                            class="mdi mdi-key"
                            type="submit"
                            style={{
                              position: "absolute",
                              top: "13px",
                              right: "77px",
                              color:"white"
                            }}
                            ></i>
                          <input
                          style={{
                            padding: "5px 8px 5px 24px", backgroundColor: "#20421F",color:"white"

                          }}
                            class="btn btn-warning btn-sm"
                            value="Save"
                            type="submit"
                          /> */}
                  </div>
                </div>
              </div>
              <div class="card-body">
                <form
                  class="form-horizontal"
                  id="enquiryForm"
                  onSubmit={submitfoam}
                >
                  <div class="form-group row mb-3">
                    <label for="customer" class="col-3 col-form-label">
                      Customer
                    </label>
                    <div class="col-9">
                      <input
                        type="text"
                        class="form-control"
                        id="customer"
                        placeholder="Customer Name"
                        name="customer"
                        required
                        value={formDatas.customer}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div class="form-group row mb-3">
                    <label for="product_type" class="col-3 col-form-label">
                      Product Type
                    </label>
                    <div class="col-9">
                      <Select
                        className="Select_pack"
                        placeholder="Product Type"
                        options={options}
                        styles={customStyles}
                        onChange={handle}
                        value={options.filter(function (option) {
                          return option.value === producttype;
                        })}
                        // defaultValue={user.packages}
                      />

                      <span
                        class="select2 select2-container select2-container--default"
                        dir="ltr"
                        data-select2-id="15"
                        style={{ Width: " 740.25px" }}
                      >
                        <span class="selection">
                          <span
                            class="select2-selection select2-selection--single"
                            role="combobox"
                            aria-haspopup="true"
                            aria-expanded="false"
                            tabindex="0"
                            aria-disabled="false"
                            aria-labelledby="select2-product_type-container"
                          >
                            <span
                              class="select2-selection__rendered"
                              id="select2-product_type-container"
                              role="textbox"
                              aria-readonly="true"
                            ></span>
                            <span
                              class="select2-selection__arrow"
                              role="presentation"
                            >
                              <b role="presentation"></b>
                            </span>
                          </span>
                        </span>
                        <span
                          class="dropdown-wrapper"
                          aria-hidden="true"
                        ></span>
                      </span>
                    </div>
                  </div>

                  <div class="form-group row mb-3">
                    <label for="SONo_JobNo" class="col-3 col-form-label">
                      S.O No. / Job No.
                    </label>
                    <div class="col-9">
                      <input
                        required
                        type="text"
                        class="form-control"
                        id="SONo_JobNo"
                        placeholder="S.O No. / Job No."
                        value={formDatas.SONo_JobNo}
                        name="SONo_JobNo"
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div class="form-group row mb-3">
                    <label for="Product_Name" class="col-3 col-form-label">
                      Product Name
                    </label>
                    <div class="col-9">
                      <input
                        required
                        type="text"
                        class="form-control"
                        id="Product_Name"
                        placeholder=" Product Name"
                        name="Product_Name"
                        value={formDatas.Product_Name}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div class="form-group row mb-3">
                    <label for="Constructiontype" class="col-3 col-form-label">
                      Construction Type
                    </label>
                    <div class="col-9">
                      <Select
                        placeholder="Construction Type"
                        className="Select_pack"
                        options={Conoptions}
                        styles={customStyles}
                        onChange={constructionhandle}
                        value={Conoptions.filter(function (option) {
                          return option.value === contructiontype;
                        })}
                        // defaultValue={user.packages}
                      />
                    </div>
                  </div>

                  <div class="form-group row mb-3">
                    <label for="Rating" class="col-3 col-form-label">
                      Rating
                    </label>
                    <div class="col-9">
                      <input
                        required
                        type="text"
                        class="form-control"
                        id="Rating"
                        placeholder="Rating"
                        name="Rating"
                        value={formDatas.Rating}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div class="form-group row mb-3">
                    <label for="files" class="col-3 col-form-label">
                      Upload Files
                    </label>
                    <div class="col-9">
                      <input
                        type="file"
                        required
                        id="files"
                        name="files[]"
                        class="form-control-file"
                        multiple="multiple"
                        onChange={handleFileChange}
                      />
                    </div>
                  </div>

                  <div class="form-group row mb-3">
                    <label for="dispatch-date" class="col-3 col-form-label">
                      Dispatch Date
                    </label>
                    <div class="col-9">
                      <input
                        type="date"
                        required
                        class="form-control date"
                        id="dispatch-date"
                        name="DispatchDate"
                        data-toggle="date-picker"
                        value={formDatas.DispatchDate}
                        data-single-date-picker="true"
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div class="form-group mb-0 justify-content-end row text-right">
                    <div class="col-9" style={{position:"relative"}}>
                     
                      <i
                          class="mdi mdi-content-save"
                          style={{
                            position: "absolute",
                            top: "5px",
                            left: "18px",
                            color: "white",
                            
                          }}
                        ></i>
                        <input
                          class="btn  btn-success btn-sm"
                          value="Save"
                          type="submit"
                          style={{ padding: "5px 8px 5px 24px", backgroundColor: "#20421F" }}
                        />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
