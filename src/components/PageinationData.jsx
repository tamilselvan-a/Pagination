import React from "react";

const PaginationData= ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    let pages = [];
    pages.push(1);
    if (totalPages > 1) pages.push(2);


    if (currentPage > 4) {
      pages.push("...");
    }

    for (let i = currentPage - 2; i <= currentPage + 2; i++) {
      if (i > 2 && i < totalPages - 1) {
        pages.push(i);
      }
    }

    if (currentPage < totalPages - 3) {
      pages.push("...");
    }

    if (totalPages > 2) pages.push(totalPages - 1);
    if (totalPages > 1) pages.push(totalPages);

    pages = [...new Set(pages)];

    return pages.sort((a, b) => {
      if (a === "...") return 1;
      if (b === "...") return -1;
      return a - b;
    });
  };

  const pages = getPageNumbers();

  return (
    <div style={{ marginTop: "20px" }}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={{ margin: "5px" }}
      >
        Prev
      </button>

      {pages.map((page, index) =>
        page === "..." ? (
          <span key={`ellipsis-${index}`} style={{ margin: "5px" }}>...</span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            style={{
              margin: "5px",
              padding: "8px 12px",
              background: page === currentPage ? "#007bff" : "#f0f0f0",
              color: page === currentPage ? "#fff" : "#000",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={{ margin: "5px" }}
      >
        Next 
      </button>
    </div>
  );
};

export default React.memo(PaginationData);
