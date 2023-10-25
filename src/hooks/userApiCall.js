import { useDispatch } from "react-redux";
import { signUpAsync } from "../features/login/loginSlice"; // Add the missing import statement

const useApiCallHook = () => {
    const dispatch = useDispatch()

    const callSignUpApi = (arg) => {
        console.log('ergwerf',arg)
        return dispatch(signUpAsync(arg))
    }

    // const callLoginApi = (arg) => {
    //     return dispatch(loginAsync(arg));
    // }

    return { callSignUpApi }; // Add the return statement
}

export default useApiCallHook;
