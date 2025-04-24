import { buildURLParam, optionSafe, requestDelete, requestGet, requestPost, requestPut } from "../utils/httpUtil";

const CATEGORY_URL = import.meta.env.VITE_BASE_URL + "/categories/";

export async function getCategories(customURL, params) {
  try {
    let url = buildURLParam(CATEGORY_URL, customURL, params);
    let options = optionSafe();
    const response = await requestGet(url, options);
    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function createCategory(payload) {
  try {
    let options = optionSafe(payload);
    const response = await requestPost(CATEGORY_URL, options);
    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function getCategory(id) {
  try {
    let options = optionSafe();
    const response = await requestGet(CATEGORY_URL + id + "/", options);
    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function updateCategory(id, payload) {
  try {
    const options = optionSafe(payload);
    const response = await requestPut(CATEGORY_URL + id + "/", options);
    return  Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function deleteCategory(id) {
  try {
    const options = optionSafe();
    const response = await requestDelete(CATEGORY_URL + id + "/", options);
    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
}