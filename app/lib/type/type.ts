/*
    using any, to reduce the workload without accessing the schema
*/

export interface SuccessRes {
  code: number,
  status: string,
  //just to speed up
  result: any
}

export interface FailedRes {
  code: number,
  status: string,
  error: string
}

export interface Res {
  code: number,
  status: string,
  error?: string,
  result?: any
}
