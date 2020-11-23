import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getPhotosData } from '../../api';
import { Pagination } from '../Pagination/Pagination';
import { Photos } from '../Photos';
import { PhotosLimit } from '../PhotosLimit';
import { getStoredData, storeData } from '../../storage';
import './Gallery.scss';

export const Gallery = ({ pinedPhotos, pinPhoto }) => {
  const { limit, page } = getStoredData();

  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [photosLimit, setPhotosLimit] = useState(+limit);
  const [currentPage, setCurrentPage] = useState(+page);

  const changeLimit = () => {
    setAllPhotos(photosLimit);
  };

  const setAllPhotos = async() => {
    const photosData = await getPhotosData(photosLimit, currentPage);

    setPhotos(photosData);
    setIsLoading(false);
    storeData(photosLimit, currentPage);
  };

  useEffect(() => {
    setAllPhotos();
  }, [currentPage]);

  return (
    <div className="Gallery">
      <h2 className="Gallery__title">
        Gallery
      </h2>

      <PhotosLimit
        changeLimit={changeLimit}
        limit={photosLimit}
        setLimit={setPhotosLimit}
        photosAmount={photos.length}
      />

      {
        isLoading && <h2>Loading...</h2>
      }

      <Photos
        photos={photos}
        pinedPhotos={pinedPhotos}
        pinPhoto={pinPhoto}
      />

      <Pagination
        currentPage={currentPage}
        changePage={setCurrentPage}
      />
    </div>
  );
};

Gallery.propTypes = {
  pinedPhotos: PropTypes.arrayOf(PropTypes.string).isRequired,
  pinPhoto: PropTypes.func.isRequired,
};
