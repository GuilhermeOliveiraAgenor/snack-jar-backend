export interface PaginationMeta {
  page: number;
  perPage: number;
  total_count: number;
  filters?: Record<string, any>;
}
