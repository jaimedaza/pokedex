interface PaginationButtonsProps {
  currentPage: number;
  totalPages: number;
  handlePreviousPage: () => void;
  handleNextPage: () => void;
}

const PaginationButtons = ({
  currentPage,
  totalPages,
  handlePreviousPage,
  handleNextPage,
}: PaginationButtonsProps) => {
  return (
    <div>
      <button onClick={handlePreviousPage} disabled={currentPage === 1}>
        Previous
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button onClick={handleNextPage} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
};

export default PaginationButtons;
