import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    const halfRange = Math.floor(maxPagesToShow / 2);

    let start = Math.max(1, currentPage - halfRange);
    let end = Math.min(totalPages, currentPage + halfRange);

    if (currentPage <= halfRange) {
      end = Math.min(totalPages, maxPagesToShow);
    } else if (currentPage + halfRange >= totalPages) {
      start = Math.max(1, totalPages - maxPagesToShow + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-center space-x-2">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded-lg ${
          currentPage === 1
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-white text-gray-700 border hover:bg-gray-100"
        }`}
      >
        Previous
      </button>

      {/* Page Numbers */}
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`px-3 py-1 rounded-lg ${
            number === currentPage
              ? "bg-green-500 text-white"
              : "bg-white text-gray-700 border hover:bg-gray-100"
          }`}
        >
          {number}
        </button>
      ))}

      {pageNumbers[pageNumbers.length - 1] < totalPages && (
        <span className="px-3 py-1">...</span>
      )}

      {pageNumbers[pageNumbers.length - 1] < totalPages && (
        <button
          onClick={() => onPageChange(totalPages)}
          className="px-3 py-1 rounded-lg bg-white text-gray-700 border hover:bg-gray-100"
        >
          {totalPages}
        </button>
      )}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 rounded-lg ${
          currentPage === totalPages
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-white text-gray-700 border hover:bg-gray-100"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
