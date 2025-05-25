/**
 * The standard response, error model
 */
export interface APIErrorResponse {
  error: Error | null
}

export interface APIDataResponse<T> {
  data: T | null
}

export interface APIResponse<T> extends APIDataResponse<T>, APIErrorResponse {}
