import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import { getPhotoInfo } from '../../api';
import { GalleryBar } from '../GalleryBar/GalleryBar';
import './ModalGallery.scss';

export const ModalGallery = (
  { photos, photoId, closeModalGallery, setCurrentModalPhotoId },
) => {
  const [currentPhoto, setCurrentPhoto] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isBottomBarOpen, setIsBottomBarOpen] = useState(false);

  const loadPhoto = async(id) => {
    const loadedPhoto = await getPhotoInfo(id);

    setCurrentPhoto(loadedPhoto);
    setCurrentIndex(photos.findIndex(photo => photo.id === loadedPhoto.id));
  };

  useEffect(() => {
    loadPhoto(photoId);
  }, [photoId]);

  const previousPhoto = () => {
    if (currentIndex - 1 < 0) {
      setCurrentModalPhotoId(photos[photos.length - 1].id);

      return;
    }

    setCurrentModalPhotoId(photos[currentIndex - 1].id);
  };

  const nextPhoto = () => {
    if (currentIndex + 1 >= photos.length) {
      setCurrentModalPhotoId(photos[0].id);

      return;
    }

    setCurrentModalPhotoId(photos[currentIndex + 1].id);
  };

  return (
    <div
      className={ClassNames('ModalGallery', {
        'ModalGallery--open-bar': isBottomBarOpen,
      })}
    >
      <div className="ModalGallery__count-info">
        {`${currentIndex + 1}/${photos.length}`}
      </div>

      {
        currentPhoto && (
          <div className="ModalGallery__photo-frame">
            <img
              src={currentPhoto.download_url}
              alt={currentPhoto.author}
              style={{ height: '100%' }}
            />
          </div>
        )
      }

      <button
        type="button"
        className="ModalGallery__left-btn"
        onClick={previousPhoto}
      >
        <i className="fas fa-chevron-left" />
      </button>

      <button
        type="button"
        className="ModalGallery__right-btn"
        onClick={nextPhoto}
      >
        <i className="fas fa-chevron-right" />
      </button>

      <button
        type="button"
        className="ModalGallery__close-btn"
        onClick={closeModalGallery}
      >
        <i className="fas fa-times" />
      </button>

      <GalleryBar
        photos={photos}
        currentPhoto={currentPhoto}
        currentIndex={currentIndex}
        isOpen={isBottomBarOpen}
        toggle={setIsBottomBarOpen}
      />
    </div>
  );
};

ModalGallery.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    size: PropTypes.shape({
      width: PropTypes.string,
      height: PropTypes.string,
    }),
    url: PropTypes.string,
  })).isRequired,
  photoId: PropTypes.string.isRequired,
  closeModalGallery: PropTypes.func.isRequired,
  setCurrentModalPhotoId: PropTypes.func.isRequired,
};
