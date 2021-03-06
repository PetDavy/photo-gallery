import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import { PhotoShape } from '../shaps/PhotoShape';
import { PhotoInfoShape } from '../shaps/PhotoInfoShape';
import './GalleryBar.scss';

export const GalleryBar = ({
  photos,
  currentPhoto,
  currentIndex,
  isOpen,
  toggle,
  setCurrentModalPhotoId,
}) => {
  const IMG_WIDTH = 89;

  return (
    <div className="GalleryBar">
      <div className="GalleryBar__author">
        {currentPhoto.author}
      </div>

      <div className="GalleryBar__list-wrapper">
        <ul
          className="GalleryBar__list"
        >
          {
            photos.map((photo, index) => (
              <li key={photo.id}>
                <img
                  src={photo.url}
                  alt={photo.id}
                  className={ClassNames('GalleryBar__small-photo', {
                    'GalleryBar__small-photo--active': index === currentIndex,
                  })}
                  style={{
                    transform: `translateX(${
                      (IMG_WIDTH * 3) + currentIndex * -IMG_WIDTH
                    }px)`,
                  }}
                  onClick={() => setCurrentModalPhotoId(photo.id)}
                  role="presentation"
                />
              </li>
            ))
          }
        </ul>
      </div>

      <button
        type="button"
        className="GalleryBar__toggler"
        onClick={() => toggle(!isOpen)}
      >
        <i
          className={ClassNames('fas', {
            'fa-chevron-up': !isOpen,
            'fa-chevron-down': isOpen,
          })}
        />
      </button>
      {photos.length}
    </div>
  );
};

GalleryBar.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.shape(PhotoShape)).isRequired,
  currentPhoto: PropTypes.shape(PhotoInfoShape).isRequired,
  currentIndex: PropTypes.number.isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  setCurrentModalPhotoId: PropTypes.func.isRequired,
};
