import {
  buildURLParam,
  optionSafe,
  requestDelete,
  requestGet,
  requestPost,
  requestPut,
} from "../utils/httpUtil";

const PRODUCT_URL = import.meta.env.VITE_BASE_URL + "/products/";

export async function getProducts(customURL, params) {
  try {
    let url = buildURLParam(PRODUCT_URL, customURL, params);
    let options = optionSafe();
    const response = await requestGet(url, options);
    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function createProduct(payload) {
  try {
    let options = optionSafe(payload);
    const response = await requestPost(PRODUCT_URL, options);
    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function getProduct(id) {
  try {
    let options = optionSafe();
    const response = await requestGet(PRODUCT_URL + id + "/", options);
    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function updateProduct(id, payload) {
  try {
    const options = optionSafe(payload);
    const response = await requestPut(PRODUCT_URL + id + "/", options);
    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function deleteProduct(id) {
  try {
    const options = optionSafe();
    const response = await requestDelete(PRODUCT_URL + id + "/", options);
    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
}
