import React, { useState } from "react";
import axios from "../constant/axios";
import { apiConstants } from "../constant/constant";
import { showToast } from "../constant/util";

function CreateHashPopup({ closeModal, onCreated }: any) {
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);

    const handleCreate = async () => {
        if (!name.trim()) {
            showToast("Hashtag name is required", { type: "error" });
            return;
        }
        setLoading(true);
        try {
            await axios.post(apiConstants.baseUrl + "hashtag", { name, status: "inactive" });
            showToast("Hashtag created successfully", { type: "success" });
            closeModal();
            if (onCreated) onCreated();
        } catch (e) {
            showToast("Failed to create hashtag", { type: "error" });
        } finally {
            setLoading(false);
        }
    };

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
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    disabled={loading}
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <input
                            type="button"
                            value={loading ? "Creating..." : "Create"}
                            className="btn btn-primary w-30 mt-5"
                            onClick={handleCreate}
                            disabled={loading}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateHashPopup;
