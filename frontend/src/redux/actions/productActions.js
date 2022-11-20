import axios from "axios"
import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_DETAIL_REQUEST, PRODUCT_DETAIL_SUCCESS, PRODUCT_DETAIL_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS, PRODUCT_CREATE_FAIL, PRODUCT_CREATE_RESET, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS, PRODUCT_UPDATE_FAIL, PRODUCT_UPDATE_RESET, PRODUCT_CREATE_REVIEW_REQUEST, PRODUCT_CREATE_REVIEW_SUCCESS, PRODUCT_CREATE_REVIEW_FAIL, PRODUCT_CREATE_REVIEW_RESET, PRODUCT_UPDATE_REVIEW_REQUEST, PRODUCT_UPDATE_REVIEW_SUCCESS,PRODUCT_UPDATE_REVIEW_FAIL, PRODUCT_UPDATE_REVIEW_RESET, PRODUCT_DELETE_REVIEW_REQUEST, PRODUCT_DELETE_REVIEW_SUCCESS, PRODUCT_DELETE_REVIEW_FAIL, PRODUCT_DELETE_REVIEW_RESET, PRODUCT_TOP_LIST_REQUEST, PRODUCT_TOP_LIST_SUCCESS, PRODUCT_TOP_LIST_FAIL } from "../constants/productConstants"

export const listProducts = (param) => async (dispatch) => {
    const keyword = param['keyword'];
    const page = Number(param['page']);
    try{
       dispatch({type: PRODUCT_LIST_REQUEST})
       const { data } = await axios.get(`/api/products?keyword=${keyword}&page=${page}`);
    //    console.log(data);
       dispatch({
        type: PRODUCT_LIST_SUCCESS, 
        payload: data
      })
    }
    catch(error){
       dispatch({
        type: PRODUCT_LIST_FAIL,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message
      })
    }
}

export const detailProducts = (id) => async (dispatch) => {
    try{
       dispatch({type: PRODUCT_DETAIL_REQUEST})
       const { data } = await axios.get(`/api/products/${id}`);
    //    console.log(data);
       dispatch({
        type: PRODUCT_DETAIL_SUCCESS, 
        payload: data
      })
    }
    catch(error){
       dispatch({
        type: PRODUCT_DETAIL_FAIL,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message
      })
    }
}

export const deleteProduct = (id) => async(dispatch,getState) => {
  try{
      dispatch({
        type: PRODUCT_DELETE_REQUEST
      })
      const { userLogin: {userInfo} } = getState();
      const config = {
          headers:{
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${userInfo.token}`,
          }
      }
      
      const { data } = await axios.delete(`/api/products/delete/${id}`,config);
      
      dispatch({
       type: PRODUCT_DELETE_SUCCESS, 
     })
     
   }
   catch(error){
      dispatch({
       type: PRODUCT_DELETE_FAIL,
       payload: error.response && error.response.data.detail ? error.response.data.detail : error.message
     })
   }
}


export const createProduct = (product) => async(dispatch,getState) => {
  try{
      dispatch({
        type: PRODUCT_CREATE_REQUEST
      })
      const { userLogin: {userInfo} } = getState();
      const config = {
          headers:{
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${userInfo.token}`,
          }
      }
      
      const { data } = await axios.post(`/api/products/create/`,product,config);
      
      dispatch({
       type: PRODUCT_CREATE_SUCCESS, 
       payload: data
     })
     
   }
   catch(error){
      dispatch({
       type: PRODUCT_CREATE_FAIL,
       payload: error.response && error.response.data.detail ? error.response.data.detail : error.message
     })
   }
}

export const updateProduct = (product) => async(dispatch,getState) => {
  try{
      dispatch({
        type: PRODUCT_UPDATE_REQUEST
      })
      const { userLogin: {userInfo} } = getState();
      const config = {
          headers:{
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${userInfo.token}`,
          }
      }
      
      const { data } = await axios.put(`/api/products/update/${product._id}/`,product,config);
      
      dispatch({
       type: PRODUCT_UPDATE_SUCCESS, 
       payload: data
     })
      
      dispatch({
        type:PRODUCT_DETAIL_SUCCESS,
        payload: data
      })
     
   }
   catch(error){
      dispatch({
       type: PRODUCT_UPDATE_FAIL,
       payload: error.response && error.response.data.detail ? error.response.data.detail : error.message
     })
   }
}

export const createProductReset = () => async(dispatch) => {
  dispatch({
    type:PRODUCT_CREATE_RESET
  })
}

export const updateProductReset = () => async(dispatch) => {
  dispatch({
    type:PRODUCT_UPDATE_RESET
  })
}

export const createProductReview = (productId, review) => async(dispatch,getState) => {
  try{
      dispatch({
        type: PRODUCT_CREATE_REVIEW_REQUEST
      })
      const { userLogin: {userInfo} } = getState();
      const config = {
          headers:{
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${userInfo.token}`,
          }
      }
      
      const { data } = await axios.post(`/api/products/review/${productId}/`,review,config);
      
      dispatch({
       type: PRODUCT_CREATE_REVIEW_SUCCESS, 
       payload: data
     })
     
   }
   catch(error){
      dispatch({
       type: PRODUCT_CREATE_REVIEW_FAIL,
       payload: error.response && error.response.data.detail ? error.response.data.detail : error.message
     })
   }
}

export const createProductReviewReset = () => async(dispatch) => {
  dispatch({
    type:PRODUCT_CREATE_REVIEW_RESET
  })
}


export const updateProductReview = (productId, review) => async(dispatch,getState) => {
  try{
      dispatch({
        type: PRODUCT_UPDATE_REVIEW_REQUEST
      })
      const { userLogin: {userInfo} } = getState();
      const config = {
          headers:{
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${userInfo.token}`,
          }
      }
      
      const { data } = await axios.put(`/api/products/review/update/${productId}/`,review,config);
      
      dispatch({
       type: PRODUCT_UPDATE_REVIEW_SUCCESS, 
       payload: data
     })
     
   }
   catch(error){
      dispatch({
       type: PRODUCT_UPDATE_REVIEW_FAIL,
       payload: error.response && error.response.data.detail ? error.response.data.detail : error.message
     })
   }
}

export const updateProductReviewReset = () => async(dispatch) => {
  dispatch({
    type:PRODUCT_UPDATE_REVIEW_RESET
  })
}

export const deleteProductReview = (productId) => async(dispatch,getState) => {
  try{
      dispatch({
        type: PRODUCT_DELETE_REVIEW_REQUEST
      })
      const { userLogin: {userInfo} } = getState();
      const config = {
          headers:{
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${userInfo.token}`,
          }
      }
      
      const { data } = await axios.delete(`/api/products/review/delete/${productId}/`,config);
      
      dispatch({
       type: PRODUCT_DELETE_REVIEW_SUCCESS, 
     })
     
   }
   catch(error){
      dispatch({
       type: PRODUCT_DELETE_REVIEW_FAIL,
       payload: error.response && error.response.data.detail ? error.response.data.detail : error.message
     })
   }
}

export const deleteProductReviewReset = () => async(dispatch) => {
  dispatch({
    type: PRODUCT_DELETE_REVIEW_RESET
  })
}

export const topListProducts = () => async (dispatch) => {
  try{
     dispatch({type: PRODUCT_TOP_LIST_REQUEST})
     const { data } = await axios.get(`/api/products/top/`);
     dispatch({
      type: PRODUCT_TOP_LIST_SUCCESS, 
      payload: data
    })
  }
  catch(error){
     dispatch({
      type: PRODUCT_TOP_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}


