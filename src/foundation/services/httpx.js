export function responseBuilder(data, url, response, client = false) {
  return {
    data,
    url,
    status: response?.status,
    message: response?.statusText,
    client,
  };
}

export function urlBuilder(baseURL, customURL, params) {
  const urlSearchParams = new URLSearchParams(params ?? {}).toString();
  let url = customURL ? customURL : baseURL;
  return urlSearchParams ? baseURL + "?" + urlSearchParams : url;
}

export function urlParameterBuilder(baseURL, parameters = []) {
  return baseURL + parameters.join("/") + "/";
}

export function optionBuilder(method, body, auth) {
  const options = {
    method,
    headers: {
      Accept: "application/json",
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
    options.headers["Content-Type"] = "application/json";
  }

  if (auth) {
    options.headers["Authorization"] = "Token " + localStorage.getItem("token");
  }
  return options;
}

export async function requestBuilder(url, body, method, auth = true) {
  try {
    const options = optionBuilder(method, body, auth);
    const response = await fetch(url, options);
    if (response.status === 204) {
      return Promise.resolve(responseBuilder(null, url, response))
    }
    const data = await response.json();
    const result = responseBuilder(data, url, response);

    if (!response.ok) {
      return Promise.reject(result);
    }

    return Promise.resolve(result);
  } catch (error) {
    return Promise.reject(responseBuilder(error, null, null, true));
  }
}
