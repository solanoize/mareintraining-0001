import { requestPost } from "../utils/httpUtil";


export const ACCOUNT_BASE_URL = `${import.meta.env.VITE_BASE_URL}/accounts/`;

export async function accountSignIn(payload) {
  try {
    const options = {
      body: JSON.stringify(payload),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }
    const response = await requestPost(ACCOUNT_BASE_URL, options);
    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
}