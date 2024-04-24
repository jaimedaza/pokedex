import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

interface PaginationButtonsProps {
  currentPage: number;
  totalPages: number;
  handlePreviousPage: () => void;
  handleNextPage: () => void;
  goToPage: (pageNumber: number) => void;
}

const PaginationButtons = ({
  currentPage,
  totalPages,
  handlePreviousPage,
  handleNextPage,
  goToPage,
}: PaginationButtonsProps) => {
  const [pageNumber, setPageNumber] = useState<string>("");

  const handleGoToPage = () => {
    const pageNumberAsNumber = parseInt(pageNumber, 10);
    if (
      !isNaN(pageNumberAsNumber) &&
      pageNumberAsNumber >= 1 &&
      pageNumberAsNumber <= totalPages
    ) {
      goToPage(pageNumberAsNumber);
      setPageNumber("");
    }
  };

  return (
    <div className="flex justify-between items-center">
      <button
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
        className="flex items-center gap-1 px-2 py-1 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FontAwesomeIcon icon={faChevronLeft} />
        <span className="hidden sm:block">Previous</span>
      </button>
      <div className="flex items-center gap-2 mx-2">
        <input
          type="text"
          value={pageNumber}
          onChange={(e) => setPageNumber(e.target.value)}
          className="w-32 sm:w-auto px-2 py-1 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
          placeholder={`Page ${currentPage} of ${totalPages}`}
        />
        <button
          onClick={handleGoToPage}
          className="px-2 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-600"
        >
          Go
        </button>
      </div>
      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className="flex items-center gap-1 px-2 py-1 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="hidden sm:block">Next</span>
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  );
};

export default PaginationButtons;
