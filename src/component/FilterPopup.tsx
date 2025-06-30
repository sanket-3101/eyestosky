import React, { useState } from "react";

interface FilterPopupProps {
  closeModal: () => void;
  onApplyFilter: (filters: FilterData) => void;
  initialFilters?: FilterData;
}

interface FilterData {
  status: string;
  postType: string;
}

function FilterPopup({ closeModal, onApplyFilter, initialFilters }: FilterPopupProps) {
  const [filters, setFilters] = useState<FilterData>(
    initialFilters || {
      status: "",
      postType: ""
    }
  );
  const [loading, setLoading] = useState(false);

  const handleFilterChange = (field: keyof FilterData, value: string) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleApply = async () => {
    setLoading(true);
    try {
      await onApplyFilter(filters);
      closeModal();
    } catch (error) {
      console.error("Error applying filter:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFilters({
      status: "",
      postType: ""
    });
  };

  return (
    <div>
      <div className="description-modal">
        <div className="description-modal-content ">
          <span className="close" onClick={closeModal}>
            &times;
          </span>
          <div>
            <p style={{ fontWeight: 'bold', color: 'black', fontSize: '20px', textAlign: 'center' }}>Apply Filter</p>
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
                  value={filters.status}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                >
                  <option value="">All Status</option>
                  <option value="approve">Approved</option>
                  <option value="reject">Rejected</option>
                  <option value="pending">Pending</option>
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
                  value={filters.postType}
                  onChange={(e) => handleFilterChange('postType', e.target.value)}
                >
                  <option value="">All Types</option>
                  <option value="image">Image</option>
                  <option value="video">Video</option>
                  <option value="audio">Audio</option>
                </select>
              </div>
            </div>
          </div>
          <div>
            <button
              type="button"
              className="btn btn-primary w-30 mt-5"
              style={{ marginRight: '5px' }}
              onClick={handleApply}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Applying...
                </>
              ) : (
                "Apply"
              )}
            </button>
            <button
              type="button"
              className="btn btn-secondary w-30 mt-5"
              onClick={handleReset}
              disabled={loading}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterPopup;
