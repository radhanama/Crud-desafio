import axios from "axios";
import {baseUrl} from './baseUrl'
export const httpGet = () =>{
  return axios
      .get(`${baseUrl}/animais`)
      .then(res =>{
          return res.data || []
      }).catch(e => {
          throw e
      })
}

export const httpDelete = (id) =>{
  return axios
      .delete(`${baseUrl}/animais/`+id)
      .then(res =>{
          return res.data
      }).catch(e => {
          throw e
      })   
}

export const httpPost = (a) =>{
  return axios
      .post(`${baseUrl}/animais`, a).then(res =>{
          return res.data || {}
      }).catch(e => {
          throw e
      })
}

export const httpGetOne = (id) =>{
  return axios
      .get(`${baseUrl}/animais/`+id).then(res =>{
          return res.data || {}
      }).catch(e => {
          throw e
      })
}

export const httpPut = (id, a) =>{
  return axios
      .put(`${baseUrl}/animais/`+id, a).then(res =>{
          return res.data
      }).catch(e => {
          throw e
      })
}