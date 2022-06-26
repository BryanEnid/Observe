const requestWrapper = async (endpoint, options) => {
  const { headers = {}, payload = '', method, baseURL } = options;
  const init = { method, headers };
  const url = new URL(endpoint, baseURL);

  if (payload) init.body = JSON.stringify(payload);

  return (await fetch(url, init)).json();
};

export class Request {
  static get(endpoint, options) {
    const config = {
      cache: options?.cache,
    };
    return requestWrapper(endpoint, {
      baseURL: this.baseURL,
      method: 'GET',
      headers: this.headers,
      ...this.options,
      ...config,
    });
  }

  static post(endpoint, payload, options) {
    const config = {
      cache: options?.cache,
    };
    return requestWrapper(endpoint, {
      baseURL: this.baseURL,
      method: 'POST',
      payload,
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      ...this.options,
      ...config,
    });
  }
}
