import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Photo } from '../Photo';
import './Photos.scss';
import { ModalGallery } from '../ModalGallery/ModalGallery';

export const Photos = ({ photos, pinedPhotos, pinPhoto }) => {
  const [currentModalPhotoId, setCurrentModalPhotoId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const openModalGallery = (id) => {
    setCurrentModalPhotoId(id);
    setIsOpen(true);
  };

  const closeModalGallery = () => {
    setIsOpen(false);
  };

  return (
    <div className="Photos">
      {
        photos.map(photo => (
          <Photo
            key={photo.id}
            photo={photo}
            pinPhoto={pinPhoto}
            openPhoto={openModalGallery}
            isPined={pinedPhotos.includes(photo.id)}
          />
        ))
      }

      {
        isOpen && (
          <ModalGallery
            photos={photos}
            photoId={currentModalPhotoId}
            setCurrentModalPhotoId={setCurrentModalPhotoId}
            closeModalGallery={closeModalGallery}
          />
        )
      }
    </div>
  );
};

Photos.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  })).isRequired,
  pinedPhotos: PropTypes.arrayOf(PropTypes.string).isRequired,
  pinPhoto: PropTypes.func.isRequired,
};
