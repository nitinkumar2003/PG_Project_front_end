import { useDispatch } from "react-redux";
import { signUpAsync } from "../features/login/loginSlice";

const useApiCallHook = () => {
    const dispatch = useDispatch()

    const callSignUpApi = (arg) => {
     return dispatch(signUpAsync(arg))
    }

    const callLoginApi = (arg) => {
        // dispatch(loginAsync(arg)).then((res) => {
        //     console.log('res', res)
        // }).catch((err) => {
        //     console.log('err', err)
        // })
    }

    return { callSignUpApi, callLoginApi }
}

export default useApiCallHook;
