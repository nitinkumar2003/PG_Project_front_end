import { useSelector } from 'react-redux';

const useCustomSelector = (sliceName) => {
  return useSelector((state) => state[sliceName]);
};

export default useCustomSelector;
