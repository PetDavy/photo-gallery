import React from 'react';
import PropTypes from 'prop-types';
import { storePhotos } from '../../storage';
import './Photo.scss';

export const Photo = ({ photo, pinPhoto, openPhoto, isPined }) => {
  const handleClick = () => {
    let newPinedPhotos;

    pinPhoto((pinedPhotos) => {
      if (isPined) {
        newPinedPhotos = pinedPhotos.filter(id => id !== photo.id);
        storePhotos(newPinedPhotos);

        return newPinedPhotos;
      }

      newPinedPhotos = [...pinedPhotos, photo.id];
      storePhotos(newPinedPhotos);

      return newPinedPhotos;
    });
  };

  return (
    <div
      className="Photo"
      style={{ gridRow: `span ${photo.size.height / 100}` }}
    >
      <img
        width={`${photo.size.width}px`}
        height={`${photo.size.height}px`}
        src={photo.url}
        alt="something"
        className="Photo__img"
        onClick={() => openPhoto(photo.id)}
        role="presentation"
      />

      <button
        type="button"
        className="Photo__pin-btn"
        onClick={handleClick}
      >
        {
          isPined
            ? <i className="fas fa-heart" />
            : <i className="far fa-heart" />
        }
      </button>
    </div>
  );
};

Photo.propTypes = {
  photo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    size: PropTypes.shape({
      width: PropTypes.string,
      height: PropTypes.string,
    }),
    url: PropTypes.string.isRequired,
  }).isRequired,
  pinPhoto: PropTypes.func.isRequired,
  openPhoto: PropTypes.func.isRequired,
  isPined: PropTypes.bool.isRequired,
};
