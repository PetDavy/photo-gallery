import PropTypes from 'prop-types';

export const PhotoInfoShape = {
  id: PropTypes.string,
  author: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  url: PropTypes.string,
  download_url: PropTypes.string,
};
