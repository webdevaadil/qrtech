import axios from "axios";
import React, { useState } from "react";
export const Createnew = () => {
  const [file, setFile] = useState([]);
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
  });

  const handleChange = (e) => {
    setFormData({
      ...formDatas,
      [e.target.name]: e.target.value
    });
  };
  const handleFileChange = (e) => {
    console.log(e.target.files);
    
    setFile(e.target.files);
  };
  console.log(file);
  const submitfoam = async (e) => {
    
    e.preventDefault();
    console.log(file.length);
   
    const formData = new FormData();
  
    formData.append('customer', formDatas.customer);
    formData.append('Product_type', formDatas.Product_type);
    formData.append('PTI_No', formDatas.PTI_No);
    formData.append('SONo_JobNo', formDatas.SONo_JobNo);
    formData.append('Panel_name', formDatas.Panel_name);
    formData.append('Constructiontype', formDatas.Constructiontype);
    formData.append('Rating', formDatas.Rating);
    formData.append('DispatchDate', formDatas.DispatchDate);
    for (let index = 0; index < file.length; index++) {
      formData.append('img', file[index]);
       
     }
    console.log(...formData);
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    await axios.post(
      "/api/auth/foamdata",
      formData
    ).then((res)=>{console.log(res.data.message);}).catch((res)=>{
      console.log(res.data.message)
    });
  };
  return (
    <>
    
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-body">
              <div class="row mb-3">
                <div class="col-md-4">
                  <h4 class="mt-2">Create Enquiry</h4>
                </div>
                <div class="col-md-8 text-right">
                  <a class="btn btn-dark btn-sm">Back </a>
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
                    <select
                      class="form-control select2 select2-hidden-accessible"
                      name="Product_type"
                      id="Product_type"
                      onChange={handleChange}
                      data-toggle="select2"
                      tabindex="-1"
                      aria-hidden="true"
                      data-select2-id="product_type"
                    >
                      <option value="" data-select2-id="16" selected>
                        Select Product Type
                      </option>
                      <option value="HT Panels">HT Panels</option>
                      <option value="LT Panels">LT Panels</option>
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
                      <span class="dropdown-wrapper" aria-hidden="true"></span>
                    </span>
                  </div>
                </div>

                <div class="form-group row mb-3">
                  <label for="pti_no" class="col-3 col-form-label">
                    PTI No.
                  </label>
                  <div class="col-9">
                    <input
                      type="text"
                      class="form-control"
                      id="pti_no"
                      placeholder="PTI No"
                      name="PTI_No"
                      value={formDatas.PTI_No}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div class="form-group row mb-3">
                  <label for="SONo_JobNo" class="col-3 col-form-label">
                    S.O No. / Job No.
                  </label>
                  <div class="col-9">
                    <input
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
                  <label for="Panel_name" class="col-3 col-form-label">
                    Panel Name
                  </label>
                  <div class="col-9">
                    <input
                      type="text"
                      class="form-control"
                      id="Panel_name"
                      placeholder="Panel Name"
                      name="Panel_name"
                      value={formDatas.Panel_name}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div class="form-group row mb-3">
                  <label for="Constructiontype" class="col-3 col-form-label">
                    Construction Type
                  </label>
                  <div class="col-9">
                    <select
                      class="form-control"
                      name="Constructiontype"
                      id="Constructiontype"
                      onChange={handleChange}
                    >
                      <option value="" selected disabled>Select any Construction Type</option>
                      <option value="Indoor">Indoor</option>
                      <option value="Outdoor">Outdoor</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div class="form-group row mb-3">
                  <label for="Rating" class="col-3 col-form-label">
                    Rating
                  </label>
                  <div class="col-9">
                    <input
                      type="number"
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
