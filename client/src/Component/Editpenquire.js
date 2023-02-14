import styles from "../Css/Editpenquire.module.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
export const Editpenquire = () => {
  const [file, setFile] = useState([]);
  const getdata = () => {
    axios.post("/api/auth/edit", { id: id }).then((res) => {
      setFormData(res.data);
    });
  };
  useEffect(() => {
    getdata();
  }, []);

  const { id } = useParams();
  const [formDatas, setFormData] = useState({
    customer: "",
    Product_type: "",
    PTI_No: "",
    SONo_JobNo: "",
    Panel_name: "",
    Constructiontype: "",
    Rating: "",
    DispatchDate: "",
    files: "",
    _id: "",
  });
  console.log(formDatas);

  const handleChange = (e) => {
    setFormData({
      ...formDatas,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    console.log(e.target.files);

    setFile(e.target.files);
  };
  const submitfoam = async (e) => {
    e.preventDefault();
    console.log(file.length);
    const formData = new FormData();
    formData.append("customer", formDatas.customer);
    formData.append("_id", formDatas._id);
    formData.append("Product_type", formDatas.Product_type);
    formData.append("PTI_No", formDatas.PTI_No);
    formData.append("SONo_JobNo", formDatas.SONo_JobNo);
    formData.append("Panel_name", formDatas.Panel_name);
    formData.append("Constructiontype", formDatas.Constructiontype);
    formData.append("Rating", formDatas.Rating);
    formData.append("DispatchDate", formDatas.DispatchDate);
    for (let index = 0; index < file.length; index++) {
      formData.append("img", file[index]);
    }
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    console.log(...formData);
    await axios
      .post("/api/auth/updatefoam", formData)
      .then((res) => {
        console.log(res.data.message);
        setFile("")

      })
      .catch((res) => {
        console.log(res.data.message);
      });
  };
  const downloadfile = (e) => {
    let id = formDatas._id;
    const header = { responseType: "blob" };
    axios
      .post("/api/auth/files", { e, id }, header)
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        console.log(response);
        link.setAttribute("download", e);
        document.body.appendChild(link);
        link.click();
      });
  };

  return (
    <>
      <div class={`row ${styles.edithead}`}>
        <div class="col-12">
          <div class="card">
            {formDatas &&
            <form
              class="form-horizontal"
              id="enquiryForm"
              method="POST"
              onSubmit={submitfoam}
              enctype="multipart/form-data"
            >
              <div class="card-body">
                <div class="row mb-3">
                  <div class="col-md-4">
                    <h4 class="mt-2">Edit Enquiry</h4>
                  </div>
                  <div class={`col-md-8 ${styles.textright}`}>
                  <Link to={`/main/viewlist`} class="btn btn-outline-dark">Back </Link>
                    <button
                      type="submit"
                      class="btn btn-success btn-sm"
                      form="enquiryForm"
                    >
                      <i class="mdi mdi-content-save"></i> Save{" "}
                    </button>
                  </div>
                </div>
              </div>
              <div class="card-body">
                <div class="form-group row mb-3">
                  <label for="customer" class="col-3 col-form-label">
                    Customer
                  </label>
                  <div class="col-9">
                    <input
                      onChange={handleChange}
                      type="text"
                      class="form-control"
                      id="customer"
                      placeholder="Customer Name"
                      name="customer"
                      value={formDatas.customer}
                    />
                  </div>
                </div>

                <div class="form-group row mb-3">
                  <label for="product_type" class="col-3 col-form-label">
                    Product Type
                  </label>

                  <div class="col-9">
                    <select
                      class="form-control select2 select2-hidden-accessible"
                      name="Product_type"
                      id="product_type"
                      data-toggle="select2"
                      tabindex="-1"
                      onChange={handleChange}
                      value={formDatas.Product_type}
                      aria-hidden="true"
                      data-select2-id="product_type"
                    >
                      <option value="">Select Product Type</option>
                      <option value="HT Panels">HT Panels</option>
                      <option
                        value="LT Panels"
                        selected=""
                        data-select2-id="16"
                      >
                        LT Panels
                      </option>
                      <option value="C&amp;R Panels">C&amp;R Panels</option>
                      <option value="CSS">CSS</option>
                      <option value="RMU">RMU</option>
                      <option value="OVCB">OVCB</option>
                      <option value="CT">CT</option>
                      <option value="PT">PT</option>
                      <option value="LA">LA</option>
                      <option value="Isolator">Isolator</option>
                      <option value="Type 2 AC EV Charger">
                        Type 2 AC EV Charger
                      </option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                <div class="form-group row mb-3">
                  <label for="pti_no" class="col-3 col-form-label">
                    PTI No.
                  </label>
                  <div class="col-9">
                    <input
                      onChange={handleChange}
                      type="number"
                      class="form-control"
                      id="pti_no"
                      placeholder="PTI No"
                      name="PTI_No"
                      value={formDatas.PTI_No}
                    />
                  </div>
                </div>
                <div class="form-group row mb-3">
                  <label for="job_no" class="col-3 col-form-label">
                    S.O No. / Job No.
                  </label>
                  <div class="col-9">
                    <input
                      onChange={handleChange}
                      type="number"
                      class="form-control"
                      id="job_no"
                      placeholder="S.O No. / Job No."
                      name="SONo_JobNo"
                      value={formDatas.SONo_JobNo}
                    />
                  </div>
                </div>

                <div class="form-group row mb-3">
                  <label for="panel_name" class="col-3 col-form-label">
                    Panel Name
                  </label>
                  <div class="col-9">
                    <input
                      type="text"
                      class="form-control"
                      onChange={handleChange}
                      id="panel_name"
                      placeholder="Panel Name"
                      name="Panel_name"
                      value={formDatas.Panel_name}
                    />
                  </div>
                </div>

                <div class="form-group row mb-3">
                  <label for="construction_type" class="col-3 col-form-label">
                    Construction Type
                  </label>
                  <div class="col-9">
                    <select
                      class="form-control"
                      onChange={handleChange}
                      name="Constructiontype"
                      id="construction_type"
                      value={formDatas.Constructiontype}
                    >
                      <option value="">Select construction type</option>
                      <option value="Indoor">Indoor</option>
                      <option value="Outdoor">Outdoor</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                <div class="form-group row mb-3">
                  <label for="rating" class="col-3 col-form-label">
                    Rating
                  </label>
                  <div class="col-9">
                    <input
                      type="text"
                      onChange={handleChange}
                      class="form-control"
                      id="rating"
                      placeholder="Rating"
                      name="Rating"
                      value={formDatas.Rating}
                    />
                  </div>
                </div>
                <div class="form-group row mb-3">
                  <label for="files" class="col-3 col-form-label">
                    Upload More Files
                  </label>
                  <div class="col-9">
                    <input
                      onChange={handleFileChange}
                      type="file"
                      id="files"
                      name="files[]"
                      class="form-control-file"
                      multiple="multiple"
                    />
                  </div>
                </div>
                <div class="form-group row mb-3">
                  <label for="dispatch-date" class="col-3 col-form-label">
                    Dispatch Date
                  </label>
                  <div class="col-9">
                    <input
                      onChange={handleChange}
                      type="date"
                      value={moment(
                        new Date(formDatas.DispatchDate)
                      ).format("YYYY-MM-DD")}
                      class="form-control date"
                      id="dispatch-date"
                      name="DispatchDate"
                      data-toggle="date-picker"
                      data-single-date-picker="true"
                    />
                  </div>
                </div>
                <div class="form-group row mb-3">
                  <>
                    <label for="files" class="col-3 col-form-label">
                      Uploaded Files
                    </label>
                    <div class="col-9">
                      <ul class="list-group">
                        {formDatas.files && formDatas.files.map((item, index) => {
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
                                <button
                                  type="button"
                                  class="btn btn-sm btn-danger"
                                  onclick="confirmDelete(39)"
                                >
                                  <i class="mdi mdi-window-close"></i>{" "}
                                </button>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </>
                </div>

                <div class="form-group mb-0 justify-content-end row text-right">
                  <div class="col-9">
                    <button
                      type="submit"
                      class="btn btn-success btn-sm"
                      form="enquiryForm"
                    >
                      <i class="mdi mdi-content-save"></i> Save{" "}
                    </button>
                  </div>
                </div>
              </div>
            </form>}
          </div>
        </div>
      </div>
    </>
  );
};
