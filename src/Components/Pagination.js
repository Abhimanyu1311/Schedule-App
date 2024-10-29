
import React from 'react';

function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="flex justify-center mt-4">
      <button
        className={`pagination__button ${currentPage === 1 ? 'pagination__disabled' : ''} " rounded-full border border-slate-300 py-2 px-3 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-blue-gray-500 hover:border-gray-100 focus:text-white focus:bg-gray-800 focus:border-white active:border-gray-50 active:text-white active:bg-blue-gray-400 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-6 "`}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Prev.
      </button>
      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i + 1}
          className={`page__number ${currentPage === i + 1 ? 'selected__page__number' : ''}" rounded-full border border-gray-500 py-2 px-3 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-blue-gray-500 hover:border-gray-100 focus:text-white focus:bg-gray-800 focus:border-white active:border-gray-50 active:text-white active:bg-blue-gray-400 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-6 "`}
          onClick={() => onPageChange(i + 1)}
        >
          {i + 1}
        </button>
      ))}
      <button
        className={`pagination__button ${currentPage === totalPages ? 'pagination__disabled' : ''}" rounded-full border border-slate-300 py-2 px-3 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-blue-gray-500 hover:border-gray-100 focus:text-white focus:bg-gray-800 focus:border-white active:border-gray-50 active:text-white active:bg-blue-gray-400 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-6 "`}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;


