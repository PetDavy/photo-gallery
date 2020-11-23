import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getMyPhotos } from '../../api';
import { MyPhoto } from '../MyPhoto';
import { ModalGallery } from '../ModalGallery/ModalGallery';
import './MyPhotos.scss';

export const MyPhotos = ({ pinedPhotos, setPinedPhotos }) => {
  const [myPhotos, setMyPhotos] = useState([]);
  const [currentModalPhotoId, setCurrentModalPhotoId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const openModalGallery = (id) => {
    setCurrentModalPhotoId(id);
    setIsOpen(true);
  };

  const closeModalGallery = () => {
    setIsOpen(false);
  };

  const setPhotos = async() => {
    const photos = await getMyPhotos(pinedPhotos);

    setMyPhotos(photos);
  };

  useEffect(() => {
    setPhotos(pinedPhotos);
  }, []);

  if (!myPhotos.length) {
    return <h1 className="MyPhotos__no-photo">No Photos</h1>;
  }

  return (
    <div className="MyPhotos">
      <h2 className="MyPhotos__title">
        my favourites
      </h2>

      <div className="MyPhotos__list">
        {
          myPhotos.map(photo => (
            <MyPhoto
              key={photo.id}
              photo={photo}
              setMyPhotos={setMyPhotos}
              openPhoto={openModalGallery}
              setPinedPhotos={setPinedPhotos}
            />
          ))
        }
      </div>

      {
        isOpen && (
          <ModalGallery
            photos={myPhotos}
            photoId={currentModalPhotoId}
            setCurrentModalPhotoId={setCurrentModalPhotoId}
            closeModalGallery={closeModalGallery}
          />
        )
      }
    </div>
  );
};

MyPhotos.propTypes = {
  pinedPhotos: PropTypes.arrayOf(PropTypes.string).isRequired,
  setPinedPhotos: PropTypes.func.isRequired,
};
