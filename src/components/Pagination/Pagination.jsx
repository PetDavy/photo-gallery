import React from 'react';
import PropTypes from 'prop-types';
import './Pagination.scss';

export const Pagination = ({ currentPage, changePage }) => (
  <div className="Pagination">
    <button
      type="button"
      onClick={() => changePage(currentPage - 1)}
      className="Pagination__btn"
      disabled={currentPage === 1}
    >
      <i className="fas fa-arrow-left" />
    </button>

    <button
      type="button"
      className="Pagination__btn"
    >
      {currentPage}
    </button>

    <button
      type="button"
      onClick={() => changePage(currentPage + 1)}
      className="Pagination__btn"
    >
      <i className="fas fa-arrow-right" />
    </button>

  </div>
);

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  changePage: PropTypes.func.isRequired,
};
