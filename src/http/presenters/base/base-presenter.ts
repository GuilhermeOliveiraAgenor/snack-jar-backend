export interface ApiResponse<T> {
  data: T;
  meta?: unknown;
}

export class BasePresenter {
  static toResponse<T>(data: T): ApiResponse<T> {
    return {
      data,
    };
  }

  static toPaginatedResponse<T, M>(data: T, meta: M): ApiResponse<T> {
    return {
      data,
      meta,
    };
  }
}
