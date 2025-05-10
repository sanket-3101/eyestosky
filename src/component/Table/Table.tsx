import React, { useState } from "react";
import Pagination from "./Pagination";

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
const TableRow = ({ rowData, columns, onActionClick }: any) => {


  return (
    <tr>
      {columns.map((value: any, index: any) =>
        value.name !== "Action" && value.name !== "Status" && value.name !== "Action Required" ? (
          <td key={index} style={{ ...value.style }}>
            {value.name === "Description"
              ? getDescriptionText(rowData[value.fieldName])
              : rowData[value.fieldName]}
          </td>
        ) : value.name === "Status" ? (
          <td>
            <span className="badge badge-info" style={{ fontSize: '12px' }}>{rowData[value.fieldName]}</span>
          </td>
        ) : value.name === "Action Required" ? (
          <td key={index} style={{ ...value.style }}>
            {rowData[value.fieldName][0]?.actionRequired}
          </td>
        ) : (
          <td>
            <span>
              <a onClick={() => onActionClick(rowData)}>
                <i className="bx bx-show text-6 text-primary cur-pointer" />
              </a>
            </span>
          </td >
        )
      )}
    </tr >
  );
};

// Functional component for the table
const Table = ({ data, columns, onActionClick, onPageChange }: any) => {
  const [currentPage, setCurrentPage] = useState(1);

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
  isHashPage,
  onCreateHashClick
}: any) => {
  const [search, setSearch] = useState("");

  const handleSearchChange = (value: string) => {
    setSearch(value);
    onSearchChange(value);
  };
  return (
    <section className="card">
      <div className="card-body">
        <div className="row mb-3 align-items-center">
          <div className="col-md-6">
            <SearchInput search={search} setSearch={handleSearchChange} />
          </div>
          {
            isHashPage &&
            <div className="col-md-6 d-flex justify-content-end">
              <input
                defaultValue="Create Hash"
                className="btn btn-primary w-5"
                onClick={onCreateHashClick}
              />
            </div>
          }

        </div>

        <Table
          data={data}
          columns={columns}
          onActionClick={onActionClick}
          onPageChange={onPageChange}
          onRowClick
        />
      </div>
    </section>
  );
};

export default TableSection;
