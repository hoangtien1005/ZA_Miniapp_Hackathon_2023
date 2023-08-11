type RequestConfig = {
  url: string;
  method:
    | 'get'
    | 'GET'
    | 'delete'
    | 'DELETE'
    | 'head'
    | 'HEAD'
    | 'options'
    | 'OPTIONS'
    | 'post'
    | 'POST'
    | 'put'
    | 'PUT'
    | 'patch'
    | 'PATCH'
    | undefined;
  baseURL: string;
  transformRequest: any[];
  transformResponse: any[];
  headers: any;
  params: any;
  timeout: number;
  withCredentials: boolean;
  responseType:
    | 'json'
    | 'arraybuffer'
    | 'blob'
    | 'document'
    | 'text'
    | 'stream'
    | undefined;
  validateStatus: (status: number) => boolean;
  maxRedirects: number;
  maxContentLength: number;
  maxBodyLength: number;
};

const requestConfig: RequestConfig = {
  url: '',
  method: 'get', // default
  baseURL: '',
  transformRequest: [
    function transformRequest(data: any) {
      // Do whatever you want to transform the data
      return data;
    },
  ],
  transformResponse: [
    // eslint-disable-next-line consistent-return
    function transformResponse(data: any) {
      // Do whatever you want to transform the data
      try {
        if (data) return JSON.parse(data);
      } catch (err) {
        if (process.env.NODE_ENV !== 'production') console.log(err);
      }
    },
  ],
  headers: {},
  params: {},
  timeout: 330000,
  withCredentials: false, // default
  responseType: 'json', // default
  validateStatus(status) {
    return status >= 200 && status < 300; // default
  },
  maxContentLength: Infinity,
  maxBodyLength: Infinity,
  maxRedirects: 5, // default
};

export default requestConfig;
