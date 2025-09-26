interface PaginationProps {
  current: number;
  total: number;
  onPageChange: (page: number) => void;
}

function Pagination({ current, total, onPageChange }: PaginationProps) {
  const handlePrev = () => {
    if (current > 1) {
      onPageChange(current - 1);
    }
  };

  const handleNext = () => {
    if (current < total) {
      onPageChange(current + 1);
    }
  };

  return (
    <div className="flex justify-center items-center gap-4 mt-4">
      <button
        onClick={handlePrev}
        disabled={current === 1}
        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
      >
        {"<"}
      </button>
      <span>Page {current}</span>
      <button
        onClick={handleNext}
        disabled={current >= total}
        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
      >
        {">"}
      </button>
    </div>
  );
}

export default Pagination;
