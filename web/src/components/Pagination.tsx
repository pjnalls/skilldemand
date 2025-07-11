import { useEffect, useState } from 'react';

import './Pagination.css';

export default function Pagination({
  dataCount,
  perPageCount,
  currentPage,
  setCurrentPage,
}: {
  dataCount: number;
  perPageCount: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}) {
  const [pages] = useState(Math.ceil(dataCount / perPageCount));
  const [, setFromIndex] = useState(0);

  const setOffset = (value: number) => {
    const fromIndex = getFromIndex(value, perPageCount, dataCount);
    setFromIndex(fromIndex || 0);
    setCurrentPage(value);
  };

  const getFromIndex = (
    page_no: number,
    per_page: number,
    total_length: number
  ) => {
    return (
      +page_no &&
      +page_no <= Math.ceil(total_length / per_page) &&
      per_page * --page_no
    );
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = currentPage; i <= currentPage + 5; i++) {
      if (i - 1 > dataCount / 10) {
        break;
      }
      pages.push(
        <span
          style={currentPage === i ? { color: '#1075c0', fontWeight: 'bold', cursor: 'default' } : { cursor: 'pointer' }}
          key={i}
          className="margin-wd-10 page-number"
          onClick={() => setOffset(i)}
        >
          {i}&nbsp;&nbsp;
        </span>
      );
    }
    return pages;
  };

  const renderPrevButton = () => {
    return (
      <>
        {currentPage > 1 ? (
          <button
            style={{ cursor: 'pointer' }}
            onClick={() => setOffset(currentPage - 1)}
          >
            Back
          </button>
        ) : (
          <button style={{ cursor: 'not-allowed', opacity: 0.5 }} disabled={true}>
            Back
          </button>
        )}
      </>
    );
  };

  const renderNextButton = () => {
    return (
      <>
        {currentPage < pages && currentPage <= dataCount / 10 ? (
          <button
            style={{ cursor: 'pointer' }}
            onClick={() => setOffset(currentPage + 1)}
          >
            Next
          </button>
        ) : (
          <button style={{ cursor: 'not-allowed', opacity: 0.5 }} disabled={true}>
            Next
          </button>
        )}
      </>
    );
  };

  const renderFirstButton = () => {
    return (
      <>
        {currentPage > 1 ? (
          <button style={{ cursor: 'pointer' }} onClick={() => setOffset(1)}>
            First
          </button>
        ) : (
          <button style={{ cursor: 'not-allowed', opacity: 0.5 }} disabled={true}>
            First
          </button>
        )}
      </>
    );
  };

  const renderLastButton = () => {
    return (
      <>
        {currentPage < pages && currentPage <= dataCount / 10 ? (
          <button
            style={{ cursor: 'pointer' }}
            onClick={() => setOffset(pages)}
          >
            Last
          </button>
        ) : (
          <button style={{ cursor: 'not-allowed', opacity: 0.5 }} disabled={true}>
            Last
          </button>
        )}
      </>
    );
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [dataCount, setCurrentPage]);

  return (
    <div className="pagination-container">
      {renderFirstButton()}
      &nbsp;
      {renderPrevButton()}
      &nbsp;
      <div className="page-numbers">{renderPageNumbers()}</div>
      {renderNextButton()}
      &nbsp;
      {renderLastButton()}
    </div>
  );
}
