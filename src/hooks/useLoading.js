 import { useSelector, useDispatch } from "react-redux";
import { isLoader } from "../features/login/loaderSlice";

const useLoading = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.loader.loading);
  console.log('isLoadingaaa',isLoading)
  const isLoadingUpdate = (arg) => {
    dispatch(isLoader(arg));
  }

  return { isLoadingUpdate,isLoading };
}

export default useLoading;
