export const getStoredData = () => {
  const limit = localStorage.getItem('limit');
  const page = localStorage.getItem('page');

  if (!limit || !page) {
    return {
      limit: 30,
      page: 1,
    };
  }

  return {
    limit,
    page,
  };
};

export const getStoredPhotos = () => {
  const myPhotos = localStorage.getItem('photos');

  if (!myPhotos) {
    return [];
  }

  return myPhotos.split(',');
};

export const storePhotos = (photos) => {
  localStorage.setItem('photos', photos);
};

export const getStoredPageNumber = () => {
  const page = localStorage.getItem('page');

  if (!page) {
    return 1;
  }

  return +page;
};

export const storeData = (limit, page) => {
  localStorage.setItem('limit', limit);
  localStorage.setItem('page', page);
};
