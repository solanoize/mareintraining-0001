import { buildURLParam, optionSafe, requestGet, requestPost } from "../utils/httpUtil";

const CATEGORY_URL = import.meta.env.VITE_BASE_URL + "/payments/";

export async function getPayments(customURL, params) {
  try {
    let url = buildURLParam(CATEGORY_URL, customURL, params);
    let options = optionSafe();
    const response = await requestGet(url, options);
    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function createPayment(payload) {
  try {
    let options = optionSafe(payload);
    const response = await requestPost(CATEGORY_URL, options);
    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function getPayment(id) {
  try {
    let options = optionSafe();
    const response = await requestGet(CATEGORY_URL + id + "/", options);
    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
}
