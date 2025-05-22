import React from "react";
function FilterPopup({ closeModal }: any) {
    return (
        <div>
            <div className="description-modal">
                <div className="description-modal-content ">
                    <span className="close" onClick={closeModal}>
                        &times;
                    </span>
                    <div>
                        <p style={{ fontWeight: 'bold', color: 'black', fontSize: '20px', textAlign: 'center' }}>Apply FIlter</p>
                    </div>
                    <div className="form-group col-sm-12">
                        <div className="row align-items-center">
                            <div className="col-md-4">
                                <label htmlFor="" className="mb-0">
                                    Status
                                </label>
                            </div>
                            <div className="col-md-8">
                                <select
                                    className="d-block form-control"
                                    // style={{ width: "4.5rem" }}
                                    value={'1'}
                                // onChange={(e) => {
                                //   handleChange({
                                //     name: {
                                //       ...userDetails.name,
                                //       salutation: e.target.value,
                                //     },
                                //   });
                                // }}
                                >
                                    <option value="1">Approved</option>
                                    <option value="2">Rejected</option>
                                    <option value="3">Pending</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="form-group col-sm-12">
                        <div className="row align-items-center">
                            <div className="col-md-4">
                                <label htmlFor="" className="mb-0">
                                    Post-Type
                                </label>
                            </div>
                            <div className="col-md-8">
                                <select
                                    className="d-block form-control"
                                    // style={{ width: "4.5rem" }}
                                    value={'1'}
                                // onChange={(e) => {
                                //   handleChange({
                                //     name: {
                                //       ...userDetails.name,
                                //       salutation: e.target.value,
                                //     },
                                //   });
                                // }}
                                >
                                    <option value="1">Image</option>
                                    <option value="2">Video</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div>
                        <input
                            defaultValue="Apply"
                            className="btn btn-primary w-30 mt-5"
                            style={{marginRight: '5px'}}
                        />
                        <input
                            defaultValue="Reset"
                            className="btn btn-primary w-30 mt-5"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FilterPopup;
