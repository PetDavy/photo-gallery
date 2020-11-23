const BASE_URL = 'https://picsum.photos';

function formatPhotoData(photoData) {
  const proportion = photoData.width / photoData.height;
  const size = {
    width: '400',
    height: `${Math.round(4 / proportion)}00`,
  };

  return {
    id: photoData.id,
    size,
    url: `${BASE_URL}/id/${photoData.id}/${size.width}/${size.height}`,
  };
}

export const getPhotosData = async(limit, currentPage) => {
  // eslint-disable-next-line max-len
  const respones = await fetch(`${BASE_URL}/v2/list?page=${currentPage}&limit=${limit}`);
  const photosData = await respones.json();

  const photos = photosData.map((photoData) => {
    const proportion = photoData.width / photoData.height;
    const size = {
      width: '400',
      height: `${Math.round(4 / proportion)}00`,
    };

    return {
      id: photoData.id,
      size,
      url: `${BASE_URL}/id/${photoData.id}/${size.width}/${size.height}`,
    };
  });

  return photos;
};

export const getMyPhotos = (photoIds) => {
  const fetchPhoto = id => (
    fetch(`${BASE_URL}/id/${id}/info`)
      .then(respones => respones.json())
      .then(formatPhotoData)
  );

  return Promise.all(photoIds.map(id => fetchPhoto(id)));
};

export const getPhotoInfo = async(id) => {
  const respones = await fetch(`${BASE_URL}/id/${id}/info`);
  const photoInfo = await respones.json();

  return photoInfo;
};
