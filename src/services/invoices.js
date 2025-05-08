import { buildURLParam, optionSafe, requestGet, requestPost } from "../utils/httpUtil";

const INVOICE_URL = import.meta.env.VITE_BASE_URL + "/invoices/";

export async function getInvoices(customURL, params) {
  try {
    let url = buildURLParam(INVOICE_URL, customURL, params);
    let options = optionSafe();
    const response = await requestGet(url, options);
    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function createInvoice(payload) {
  try {
    let options = optionSafe(payload);
    const response = await requestPost(INVOICE_URL, options);
    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function getInvoice(id) {
  try {
    let options = optionSafe();
    const response = await requestGet(INVOICE_URL + id + "/", options);
    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
}