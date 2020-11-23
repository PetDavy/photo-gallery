import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getMyPhotos } from '../../api';
import { MyPhoto } from '../MyPhoto';
import './MyPhotos.scss';

export const MyPhotos = ({ pinedPhotos, setPinedPhotos }) => {
  const [myPhotos, setMyPhotos] = useState([]);

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
              setPinedPhotos={setPinedPhotos}
            />
          ))
        }
      </div>
    </div>
  );
};

MyPhotos.propTypes = {
  pinedPhotos: PropTypes.arrayOf(PropTypes.string).isRequired,
  setPinedPhotos: PropTypes.func.isRequired,
};
