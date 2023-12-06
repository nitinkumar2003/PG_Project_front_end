import axios from "axios";
import { $Api_Url } from "./Url";
import { json } from "react-router-dom";

axios.defaults.baseURL = 'http://localhost:4001/';
axios.defaults.headers.common['Content-Type'] = `application/json`


const invokeApi = async (method, url, data = null) => {
  try {
    const response = await axios({ method, url, data });
    return response.data;
  } catch (error) {
    console.log('Error:', error)
    throw error;
  }
};



const $Services = {

  userSignUp: async (jsonObj) => {
    let url = $Api_Url.userRegistration_Url
    return invokeApi('POST', url, jsonObj)
  },
  userLogin: async (jsonObj) => {
    let url = $Api_Url.userLogin_Url
    return invokeApi('POST', url, jsonObj)
  },
  passwordForgot: async (jsonObj) => {
    let url = $Api_Url.passwordForgot_Url
    return invokeApi('POST', url, jsonObj)
  },
  sentOtp: async (jsonObj) => {
    let url = $Api_Url.postOtp_Url
    return invokeApi('POST', url, jsonObj)
  },
  verifyOtp: async (jsonObj) => {
    let url = $Api_Url.veriyfyOtp_Url
    return invokeApi('POST', url, jsonObj)
  },
  getHomeType:async()=>{
    let url = $Api_Url.get_hometypeList
    return invokeApi('GET', url, '')
  },
  getLivingType:async()=>{
    let url = $Api_Url.get_livingtypeList
    return invokeApi('GET', url,'')
  },
  getSharingType:async()=>{
    let url = $Api_Url.get_sharingtypeList
    return invokeApi('GET', url,'')
  },
  getPriceType:async()=>{
    let url = $Api_Url.get_pricerangeList
    return invokeApi('GET', url, '')
  },
  getAppQuestiosn:async({property_id})=>{
    let url = $Api_Url.get_allQuestions+property_id
    return invokeApi('GET', url, '')
  },
  postPropertyBasic:async(jsonObj)=>{
    let url=$Api_Url.post_property_url;
    return invokeApi('POSt', url,jsonObj)
  },
  postPropertyAnswer:async(jsonObj)=>{
    let url=$Api_Url.post_property_answer_url;
    return invokeApi('POSt', url,jsonObj)
  },
  getPropertyList:async()=>{
    let url=$Api_Url.getPropertyList_url
    return invokeApi('GET', url,' ')
  },
  postAddress:async(jsonObj)=>{
    let url=$Api_Url.post_address_url
    return invokeApi('POST',url,jsonObj)
  }
}





export default $Services

