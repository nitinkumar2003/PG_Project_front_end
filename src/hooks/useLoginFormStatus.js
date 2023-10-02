import { useSelector, useDispatch } from "react-redux";
import { openLoginSignUpForm} from "../features/login/loginSlice";


const useLoginFormStatus = () => {
    const { isLoginSignUpForm, isLoginForm, isSignUpForm } = useSelector(state => state.login);
    return { isLoginSignUpForm, isLoginForm, isSignUpForm };
}

const useCustomDispatch = (action) => {
    const dispatch = useDispatch();

    const customDispatch = (action) => {
        dispatch(openLoginSignUpForm(action));
    };

    return customDispatch;
};



export { useLoginFormStatus, useCustomDispatch };
