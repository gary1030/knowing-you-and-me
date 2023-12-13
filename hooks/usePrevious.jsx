import React, { useEffect } from 'react';

function usePrevious(value) {
  const ref = React.useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

export default usePrevious;
