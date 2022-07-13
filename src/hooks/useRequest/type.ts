export interface UseRequestInterface<T> {
    loading: boolean;
    error: string;
    data: T;
}