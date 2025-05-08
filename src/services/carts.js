import {
  buildURLParam,
  optionSafe,
  requestDelete,
  requestGet,
  requestPost,
  requestPut,
} from "../utils/httpUtil";

const CART_URL = import.meta.env.VITE_BASE_URL + "/carts/";

export async function getCarts(customURL, params) {
  try {
    let url = buildURLParam(CART_URL, customURL, params);
    let options = optionSafe();
    const response = await requestGet(url, options);
    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function createCart(payload) {
  try {
    let options = optionSafe(payload);
    const response = await requestPost(CART_URL, options);
    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function getCart(id) {
  try {
    let options = optionSafe();
    const response = await requestGet(CART_URL + id + "/", options);
    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function updateCart(id, payload) {
  try {
    const options = optionSafe(payload);
    const response = await requestPut(CART_URL + id + "/", options);
    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function deleteCart(id) {
  try {
    const options = optionSafe();
    const response = await requestDelete(CART_URL + id + "/", options);
    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
}
