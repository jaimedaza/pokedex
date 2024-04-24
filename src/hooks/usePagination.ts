import { useState } from "react";

interface PaginationOptions {
  initialPage?: number;
  totalPages: number;
}

const usePagination = ({ initialPage = 1, totalPages }: PaginationOptions) => {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const goToPage = (pageNumber: number) => {
    setCurrentPage(Math.max(1, Math.min(pageNumber, totalPages)));
  };

  return {
    currentPage,
    handlePreviousPage,
    handleNextPage,
    goToPage,
  };
};

export default usePagination;
