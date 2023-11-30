import { useSelector, useDispatch } from "react-redux";
import { isLoginOrNot } from "../features/login/loginSlice";

const useCustomDispatchHook = () => {
    const dispatch = useDispatch()

    const isLoginOrNotDispatch = (action) => {
        dispatch(isLoginOrNot(action))
    }


    return { isLoginOrNotDispatch };
}

export default useCustomDispatchHook; 
