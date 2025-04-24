export interface Result<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}

export interface ApiResponse<T> {
  results: T[];
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
} 