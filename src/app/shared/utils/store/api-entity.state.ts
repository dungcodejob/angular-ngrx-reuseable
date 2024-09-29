import { EntityAdapter, EntityState } from "@ngrx/entity";

export interface ApiEntityState<T> extends EntityState<T> {
  loading: boolean;
  error: any;
}

export function createApiEntityState<T>(adapter: EntityAdapter<T>): ApiEntityState<T> {
  return {
    ...adapter.getInitialState(),
    loading: false,
    error: null,
  };
}
