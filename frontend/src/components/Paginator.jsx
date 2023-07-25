import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/* eslint-disable react/prop-types */
export default function Paginator({ currentPage, numPages, handlePrev, handleNext }) {
  return (
    <div className="flex flex-col gap-4  p-4">
      <p>
        Page {currentPage} of {numPages}
      </p>
      <div className="flex gap-2">
        <PageButton onClick={handlePrev}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </PageButton>
        <PageButton onClick={handleNext}>
          <FontAwesomeIcon icon={faChevronRight} />
        </PageButton>
      </div>
    </div>
  );
}

function PageButton({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="bg-sky-500 hover:bg-sky-600 text-white rounded-xl w-10 h-10 shadow"
    >
      {children}
    </button>
  );
}
