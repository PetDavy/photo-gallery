import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './PhotosLimit.scss';

export const PhotosLimit = ({ limit, setLimit, changeLimit, photosAmount }) => {
  const [isOnChanging, setIsOnChanging] = useState(false);

  const handleChange = (event) => {
    const value = Number(event.target.value);

    setLimit(value);
  };

  const handleBlure = (event) => {
    if (limit > 100) {
      setLimit(100);
      event.target.focus();

      return;
    }

    if (limit < 1) {
      setLimit(1);
      event.target.focus();

      return;
    }

    changeLimit();
    setIsOnChanging(false);
  };

  if (!isOnChanging) {
    return (
      <div className="PhotosLimit__title">
        <h3>
          {`${photosAmount} photos`}
        </h3>

        <button
          type="button"
          onClick={() => setIsOnChanging(true)}
          className="PhotosLimit__pen-btn"
        >
          <i className="fas fa-pen" />
        </button>
      </div>
    );
  }

  return (
    <label className="PhotosLimit__label">
      <input
        type="number"
        min="1"
        max="100"
        value={limit}
        className="PhotosLimit__input"
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus
        onChange={handleChange}
        onBlur={handleBlure}
      />
      <h3>photos</h3>
    </label>
  );
};

PhotosLimit.propTypes = {
  limit: PropTypes.number.isRequired,
  setLimit: PropTypes.func.isRequired,
  changeLimit: PropTypes.func.isRequired,
  photosAmount: PropTypes.number.isRequired,
};
