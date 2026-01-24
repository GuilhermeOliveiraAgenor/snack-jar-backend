export interface ApiResponse<T> {
  data: T;
  status: number;
  ok: boolean;
  meta?: unknown;
}

export class BasePresenter {
  static toResponse<T>(data: T, status = 200): ApiResponse<T> {
    return {
      data,
      status,
      ok: true,
    };
  }

  static toPaginatedResponse<T, M>(data: T, meta: M, status = 200): ApiResponse<T> {
    return {
      data,
      meta,
      status,
      ok: true,
    };
  }
}
