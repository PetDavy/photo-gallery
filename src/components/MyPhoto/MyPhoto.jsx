import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { PhotoShape } from '../shaps/PhotoShape';
import { storePhotos } from '../../storage';
import './MyPhoto.scss';

export const MyPhoto = ({ photo, setMyPhotos, openPhoto, setPinedPhotos }) => {
  const [isOnRemove, setIsOnRemove] = useState(false);

  const removePhoto = () => {
    setMyPhotos((pinedPhotos) => {
      const mewPhotos = pinedPhotos.filter(pinedPhoto => (
        pinedPhoto.id !== photo.id
      ));

      const newPhotosIds = mewPhotos.map(newPhoto => newPhoto.id);

      storePhotos(newPhotosIds);
      setPinedPhotos(newPhotosIds);

      return mewPhotos;
    });
  };

  const handleRemove = () => {
    setIsOnRemove(true);
    setTimeout(removePhoto, 600);
  };

  return (
    <div
      className={classNames('MyPhoto', {
        'MyPhoto__on-remove': isOnRemove,
      })}
      style={{ gridRow: `span ${photo.size.height / 100}` }}
    >
      <img
        width={`${photo.size.width}px`}
        height={`${photo.size.height}px`}
        src={photo.url}
        alt="something"
        className="MyPhoto__img"
        onClick={() => openPhoto(photo.id)}
        role="presentation"
      />

      <button
        type="button"
        onClick={handleRemove}
        className="MyPhoto__remove-btn"
      >
        remove
      </button>
    </div>
  );
};

MyPhoto.propTypes = {
  photo: PropTypes.shape(PhotoShape).isRequired,
  setMyPhotos: PropTypes.func.isRequired,
  openPhoto: PropTypes.func.isRequired,
  setPinedPhotos: PropTypes.func.isRequired,
};
