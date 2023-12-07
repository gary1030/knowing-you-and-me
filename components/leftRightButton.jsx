import * as React from 'react';
import PropTypes from 'prop-types';
import { IconButton, MD3Colors } from 'react-native-paper';

function LeftRightButton({ icon, direction, index, setIndex }) {
  const handlePress = () => {
    if (direction === 'left') {
      setIndex(index - 1);
    }
    if (direction === 'right') {
      if (index === 0) {
        setIndex(0);
      } else {
        setIndex(index + 1);
      }
    }
    console.log(direction);
  };

  return (
    <IconButton
      icon={icon}
      iconColor={MD3Colors.primary20}
      size={20}
      onPress={() => handlePress()}
      disabled={direction === 'right' && index === 0}
    />
  );
}

LeftRightButton.propTypes = {
  icon: PropTypes.string.isRequired,
  direction: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  setIndex: PropTypes.func.isRequired,
};

export default LeftRightButton;
