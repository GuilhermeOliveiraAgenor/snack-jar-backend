export interface PaginationMeta {
  page: number;
  per_page: number;
  total_count: number;
  filters?: Record<string, unknown>;
}
