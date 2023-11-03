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
  getAppQuestiosn:async({userId})=>{
    let url = $Api_Url.get_allQuestions+userId
    return invokeApi('GET', url, '')
  },
}


export default $Services

