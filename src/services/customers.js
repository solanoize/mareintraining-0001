
import {
  buildURLParam,
  optionSafe,
  requestDelete,
  requestGet,
  requestPost,
  requestPut,
} from "../utils/httpUtil";

const CUSTOMER_URL = import.meta.env.VITE_BASE_URL + "/customers/";

export async function getCustomers(customURL, params) {
  try {
    let url = buildURLParam(CUSTOMER_URL, customURL, params);
    let options = optionSafe();
    const response = await requestGet(url, options);
    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function createCustomer(payload) {
  try {
    let options = optionSafe(payload);
    const response = await requestPost(CUSTOMER_URL, options);
    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function getCustomer(id) {
  try {
    let options = optionSafe();
    const response = await requestGet(CUSTOMER_URL + id + "/", options);
    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function updateCustomer(id, payload) {
  try {
    let options = optionSafe(payload);
    const response = await requestPut(CUSTOMER_URL + id + "/", options);
    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function deleteCustomer(id) {
  try {
    let options = optionSafe();
    const response = await requestDelete(CUSTOMER_URL + id + "/", options);
    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
}
