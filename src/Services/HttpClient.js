import axios from "axios";

const client = axios.create({
  timeout: 10000,
});

client.interceptors.request.use(
  (config) => {
    console.debug(
      `sending ${config.method.toUpperCase()} request to ${config.url}`
    );

    return config;
  },
  (error) => {
    return Promise.reject({
      success: false,
      error,
    });
  }
);

/**
 * Transform response
 */
client.interceptors.response.use(
  (response) => {
    return new Promise((resolve) => {
      return resolve({
        success: true,
        data: response.data,
      });
    });
  },
  (error) => {
    if (error.response) {
      // The request was made, and the server responded, with a status code that falls out of the range of 2xx
      const errorData = error.response.data;
      let errorStatus = error.response.status;
      let errorMessage;
      if (typeof errorData === "string" && errorData.length > 0) {
        errorMessage = errorData;
      } else {
        if (Array.isArray(errorData)) {
          errorMessage = errorData.join("\n");
        } else if (errorData.message) {
          errorMessage = errorData.message;
        } else {
          errorMessage =
            "An error has occurred. Please check your internet connection and try again.";
        }
      }
      return Promise.resolve({
        success: false,
        status: errorStatus,
        message: errorMessage,
        error,
      });
    } else if (error.request) {
      // request was made but no response was received
      let errorMessage;
      if (error.code === "ECONNABORTED") {
        errorMessage =
          "The request timed out. Please check your internet connection";
      } else {
        errorMessage =
          "An error has occurred. Please check your internet connection and try again.";
      }
      return Promise.resolve({
        success: false,
        status: null,
        message: errorMessage,
        error,
      });
    } else {
      // neither request nor response is present on error
      return Promise.resolve({
        success: false,
        status: null,
        message: error.message,
        error,
      });
    }
  }
);

/**
 * Set up Auth header with jwt token
 * for requests that need authorisation
 * @param token
 * @param platformKey
 * @returns {{'Content-Type': string}}
 */
function getHeaders(token) {
  const headers = {
    "Content-Type": "application/json",
    Accept: "*/*",
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
}

function getMultipartHeaders(token) {
  const headers = {
    "Content-Type": "multipart/form-data",
    Accept: "application/json,text/plain,*/*",
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
}

export const get = (url, params = null, authToken = null) => {
  console.debug("GET " + url);
  return client.get(url, { params: params, headers: getHeaders(authToken) });
};

export const post = (url, data, authToken = null) => {
  let config = { headers: getHeaders(authToken) };
  console.debug("POST " + url);
  console.debug("POST DATA " + JSON.stringify(data));
  return client.post(url, data, config);
};

export const put = (url, data, authToken = null) => {
  let config = { headers: getHeaders(authToken) };
  console.debug("PUT " + url);
  return client.put(url, data, config);
};

export const remove = (url, params = null, authToken = null) => {
  console.debug("DELETE " + url);
  return client.delete(url, { params: params, headers: getHeaders(authToken) });
};
