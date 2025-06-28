import React, { useState } from "react";
import Pagination from "./Pagination";
import { formatDate } from "../../constant/util";

// Functional component for the search input
const SearchInput = ({
  search,
  setSearch,
}: {
  search: string;
  setSearch: (value: string) => void;
}) => {
  return (
    <div className="search">
      <i className="bx bx-search" />
      <input
        type="search"
        className="form-control"
        placeholder="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

const getDescriptionText = (text: string) => {
  if (!text) {
    return
  }
  if (text.length < 300) {
    return text;
  }

  return text.substring(0, 320) + "...";
};
// Functional component for a table row
const TableRow = ({ rowData, columns, onActionClick, onEditAction }: any) => {
  const renderCell = (column: any, index: number) => {
    const { name, fieldName, style } = column;
    
    // Handle different column types
    switch (name) {
      case "Action":
        return (
          <td key={index}>
            <span className="flex items-center">
              <a onClick={() => onActionClick(rowData)} className="cur-pointer text-primary mr-6" title="View">
                <i className="bx bx-show text-6" />
              </a>
              {onEditAction && (
                <a onClick={() => onEditAction(rowData)} className="cur-pointer text-primary" title="Edit">
                  <i className="bx bx-edit text-6" />
                </a>
              )}
            </span>
          </td>
        );
        
      case "Status":
        return (
          <td key={index}>
            <span className="badge badge-info" style={{ fontSize: '12px' }}>
              {rowData[fieldName]}
            </span>
          </td>
        );
        
      case "Action Required":
        return (
          <td key={index} style={{ ...style }}>
            {rowData[fieldName][0]?.actionRequired}
          </td>
        );
        
      case "Date":
        return (
          <td key={index} style={{ ...style }}>
            {formatDate(rowData[fieldName])}
          </td>
        );
        
      case "Description":
        return (
          <td key={index} style={{ ...style }}>
            {getDescriptionText(rowData[fieldName])}
          </td>
        );
        
      case "Post-Link":
        return (
          <td key={index} style={{ ...style }}>
            <a 
              href={rowData[fieldName]} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary text-decoration-none"
            >
              {rowData[fieldName]}
            </a>
          </td>
        );
        
      default:
        return (
          <td key={index} style={{ ...style }}>
            {rowData[fieldName]}
          </td>
        );
    }
  };

  return (
    <tr>
      {columns.map((column: any, index: number) => renderCell(column, index))}
    </tr>
  );
};

// Functional component for the table
const Table = ({ data, columns, onActionClick, onPageChange, onEditAction, setCurrentPage, currentPage }: any) => {

  const totalPages = data.totalPage;
  const currentPageData = data.data;

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    onPageChange(pageNumber);
  };
  return (
    <>
      <div className="table-responsive">
        <table className="table table-responsive-md table-bordered common-table mb-0">
          <thead>
            <tr>
              {columns.map((data: { name: string }, index: number) => (
                <th key={index}>{data.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentPageData.map((item: any, index: number) => (
              <TableRow
                key={index}
                rowData={item}
                columns={columns}
                onActionClick={onActionClick}
                onEditAction={onEditAction}
              />
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
};

// Functional component for the card section
const TableSection = ({
  data,
  columns,
  onActionClick,
  onPageChange,
  onSearchChange,
  showCustomButton,
  onCustomButtonClick,
  onEditAction,
  customButtonName
}: any) => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    onSearchChange(value)
    setCurrentPage(1);
  };

  return (
    <section className="card">
      <div className="card-body">
        <div className="row mb-3 align-items-center">
          {
            onSearchChange && <div className="col-md-6">
              <SearchInput search={search} setSearch={handleSearchChange} />
            </div>
          }

          {
            showCustomButton &&
            <div className="col-md-6 d-flex justify-content-end">
              <input
                defaultValue={customButtonName}
                className="btn btn-primary w-5"
                onClick={onCustomButtonClick}
              />
            </div>
          }

        </div>

        <Table
          data={data}
          columns={columns}
          onActionClick={onActionClick}
          onPageChange={onPageChange}
          onEditAction={onEditAction}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          onRowClick
        />
      </div>
    </section>
  );
};

export default TableSection;
