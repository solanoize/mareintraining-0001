const controller = new AbortController();
const signal = controller.signal;

export async function request(url, options = {}) {
  try {
    const response = await fetch(url, {...options, signal});
    let data = response.status === 204 ? null : await response.json();
    let result = { data, context: { url } }

    if (response.ok) {
      return Promise.resolve(result);
    }

    throw result;

  } catch (error) {
    return Promise.reject(error);
  }
}

export function requestGet(url, options={}) {
  return request(url, {...options, method: 'GET'})
}

export function requestPost(url, options={}) {
  return request(url, {...options, method: 'POST'})
}

export function requestPut(url, options={}) {
  return request(url, {...options, method: 'PUT'})
}

export function requestPatch(url, options={}) {
  return request(url, {...options, method: 'PATCH'})
}

export function requestDelete(url, options={}) {
  return request(url, {...options, method: 'DELETE'})
}

export function buildURLParam(baseURL, customURL, params) {
  const urlSearchParams = new URLSearchParams(params ?? {}).toString();
  let url = customURL ? customURL : baseURL;
  return urlSearchParams ? baseURL + "?" + urlSearchParams : url;
}


export function optionSafe(body) {
  const options = {
    headers: {
      'Accept': 'application/json',
      'Authorization': `Token ${localStorage.getItem('token')}`
    }
  };

  if (body) {
    options.body = JSON.stringify(body);
    options.headers = {...options.headers, 'Content-Type': 'application/json'};
  }

  return options;
}