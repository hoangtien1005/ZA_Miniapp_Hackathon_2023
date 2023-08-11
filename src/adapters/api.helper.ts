export interface Api {
  get(url: string, params?, config?): Promise<any>;
  post(url: string, body?, config?): Promise<any>;
  put(url: string, body?, config?): Promise<any>;
  patch(url: string, body?, config?): Promise<any>;
  deleteResource(url: string, config?): Promise<any>;
}

export interface ResponseData<T> {
  msg: string;
  code: number;
  data: T;
  success: boolean;
  total?: number;
  not_empty?: boolean;
  empty?: boolean;
}
