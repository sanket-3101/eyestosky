import React from "react";
function CreateHashPopup({ closeModal }: any) {
    return (
        <div>
            <div className="description-modal">
                <div className="description-modal-content ">
                    <span className="close" onClick={closeModal}>
                        &times;
                    </span>
                    <div>
                        <p style={{fontWeight: 'bold', color: 'black', fontSize: '20px', textAlign: 'center' }}>Create Hashtag</p>
                    </div>
                    <div className="form-group col-sm-12">
                        <div className="row align-items-center">
                            <div className="col-md-4">
                                <label htmlFor="" className="mb-0">
                                    Name of Hashtag
                                </label>
                            </div>
                            <div className="col-md-8">
                                <input
                                    type="text"
                                    className="form-control"
                                    value={'Test'}
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <input
                            defaultValue="Create"
                            className="btn btn-primary w-30 mt-5"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateHashPopup;
