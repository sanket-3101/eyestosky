import { useEffect, useState } from "react";
import axios from "../../../constant/axios";
import { apiConstants } from "../../../constant/constant";
import { showToast } from "../../../constant/util";

import { Loader } from "../../../component/Loader";
import TableSection from "../../../component/Table/Table";

interface ContactListType {
    data: {
        _id: string;
        name: string;
        email: string;
        message: string;
        status: string;
        createdAt: string;
        updatedAt: string;
    }[];
    totalItems: number;
    itemsPerPage: number;
    totalPage: number;
    pageNumber: number;
}

function Contactus() {
    const [contactList, setContactList] = useState<ContactListType | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedContact, setSelectedContact] = useState<any>(null);
    const [showStatusModal, setShowStatusModal] = useState(false);
    const [statusUpdateLoading, setStatusUpdateLoading] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState<string>('');

    const columns = [
        {
            id: "1",
            name: "Date",
            fieldName: "created_at",
            style: {
                width: "15%",
            },
        },
        {
            id: "2",
            name: "Name",
            fieldName: "name",
            style: {
                width: "15%",
            },
        },
        {
            id: "3",
            name: "Email",
            fieldName: "email",
            style: {
                width: "20%",
            },
        },
        {
            id: "4",
            name: "Message",
            fieldName: "message",
            style: {
                width: "30%",
            },
        },
        {
            id: "5",
            name: "Status",
            fieldName: "status",
            style: {
                width: "10%",
            },
        },
    ];

    useEffect(() => {
        getDetails({
            page: 1,
            search: "",
        });
    }, []);

    const getDetails = async (data: any) => {
        let details = {
            search: data.search,
            page: data.page,
            limit: 10
        };

        await axios
            .get(apiConstants.baseUrl + apiConstants.getContactList(details))
            .then((response) => {
                console.log(response.data);
                const { data } = response;
                if (data) {
                    const details = {
                        pageNumber: data.page,
                        totalItems: data.total,
                        itemsPerPage: data.limit,
                        totalPage: data.total_pages,
                        data: data.data,
                    };
                    setContactList(details);
                }
                setLoading(false);
            });
    };


    const onStatusClick = (data: any) => {
        console.log(data)
        setSelectedContact(data);
        setSelectedStatus(data.status);
        setShowStatusModal(true);
    };

    const handleStatusUpdate = async () => {
        if (!selectedContact || !selectedStatus) return;

        try {
            setStatusUpdateLoading(true);
            const response = await axios.put(
                apiConstants.updateContactStatus(selectedContact.id),
                { status: selectedStatus }
            ) as any;

            if (!response.isError) {
                showToast("Status updated successfully", { type: "success" });
                // Refresh the contact list
                await getDetails({
                    page: 1,
                    search: "",
                });
                setShowStatusModal(false);
                setSelectedContact(null);
                setSelectedStatus('');
            } else {
                showToast(response.message || "Failed to update status", { type: "error" });
            }
        } catch (error: any) {
            showToast("Error updating status", { type: "error" });
            console.error('Error updating status:', error);
        } finally {
            setStatusUpdateLoading(false);
        }
    };

    const handleCloseModal = () => {
        setShowStatusModal(false);
        setSelectedContact(null);
        setSelectedStatus('');
    };

    return loading ? (
        <Loader />
    ) : (
        <section className="card">
            <div className="card-body">
                <TableSection
                    data={contactList}
                    columns={columns}
                    onPageChange={(pageNumber: number) =>
                        getDetails({ search: "", page: pageNumber })
                    }
                    onSearchChange={(value: string) =>
                        getDetails({ search: value, page: 1 })
                    }
                    onStatusClick={onStatusClick}
                />
            </div>

            {/* Status Update Modal */}
            {showStatusModal && selectedContact && (
                <div className="modal fade show" style={{ display: 'block' }} tabIndex={-1}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Update Contact Status</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={handleCloseModal}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label">Contact Details:</label>
                                    <div className="border p-3 rounded">
                                        <p><strong>Name:</strong> {selectedContact.name}</p>
                                        <p><strong>Email:</strong> {selectedContact.email}</p>
                                        <p><strong>Message:</strong> {selectedContact.message}</p>
                                        <p><strong>Current Status:</strong>
                                            <span className={`badge ${selectedContact.status === 'resolved' ? 'badge-success' : selectedContact.status === 'pending' ? 'badge-warning' : 'badge-info'} ms-2`}>
                                                {selectedContact.status}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Update Status:</label>
                                    <select
                                        className="form-select"
                                        value={selectedStatus}
                                        onChange={(e) => setSelectedStatus(e.target.value)}
                                        disabled={statusUpdateLoading}
                                    >
                                        <option value="unresolved">Unresolved</option>
                                        <option value="resolved">Resolved</option>
                                    </select>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={handleCloseModal}
                                    disabled={statusUpdateLoading}
                                >
                                    Close
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={handleStatusUpdate}
                                    disabled={statusUpdateLoading || selectedStatus === selectedContact?.status}
                                >
                                    {statusUpdateLoading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                            Updating...
                                        </>
                                    ) : (
                                        'Update Status'
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Backdrop */}
            {showStatusModal && (
                <div className="modal-backdrop fade show"></div>
            )}
        </section>
    );
}

export default Contactus;