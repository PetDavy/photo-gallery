import PropTypes from 'prop-types';

export const PhotoShape = {
  id: PropTypes.string.isRequired,
  size: PropTypes.shape({
    width: PropTypes.string,
    height: PropTypes.string,
  }),
  url: PropTypes.string.isRequired,
};
