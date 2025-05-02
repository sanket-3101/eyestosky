import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }: any) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
  
  // Determine the start and end page numbers for the 5-page slot
  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, startPage + 4);

  const displayedPages = pageNumbers.slice(startPage - 1, endPage);

  return (
    <nav className="mt-2">
      <ul className="pagination justify-content-end">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <a
            className="page-link"
            onClick={() => onPageChange(currentPage - 1)}
            aria-label="Previous"
          >
            <span aria-hidden="true">«</span>
            <span className="sr-only">Previous</span>
          </a>
        </li>

        {displayedPages.map((page, index) => (
          <li
            key={index}
            className={`page-item ${currentPage === page ? "active" : ""}`}
            style={{ cursor: "pointer" }}
          >
            <a className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}

        <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
          <a
            className="page-link"
            onClick={() => onPageChange(currentPage + 1)}
            aria-label="Next"
          >
            <span aria-hidden="true">»</span>
            <span className="sr-only">Next</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
