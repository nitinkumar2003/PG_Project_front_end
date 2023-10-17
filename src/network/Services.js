import axios from "axios";
import { $Api_Url } from "./Url";

axios.defaults.baseURL = 'http://localhost:4001/';



const invokeApi = (url, method, body, cancel) => {
  if (cancel) {
    cancel();
  }
  try {
    let token = sessionStorage.getItem("AuthToken");
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return axios({
      cancelToken: new axios.CancelToken(function executor(c) {
        cancel = c;
      }),

      method: method,
      url: url,
      params: (method === "GET") ? body : null,
      data: method === "POST" || method === "PUT" || method === "DELETE" ? body : null,
    });

  }
  catch (error) {
    if (axios.isCancel(error)) {
      konsole.error('Request canceled', error.message);
      throw error;
    } else {
      throw error;
      konsole.error('Something went wrong: ', error.message)
    }
  }
}

const $Services={

  userSignUp:async(jsonObj)=>{
    let cancel;
    let url=$Api_Url.userRegistration_Url
    return invokeApi(url,'POST',jsonObj,cancel)
  }
}


export default $Services

