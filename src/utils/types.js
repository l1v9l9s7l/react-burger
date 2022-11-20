import PropTypes from 'prop-types';

const ingridientPropTypes = {
  image: PropTypes.string.isRequired,
  price: PropTypes.number,
  name: PropTypes.string.isRequired,
  calories: PropTypes.number.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
};

export default ingridientPropTypes;