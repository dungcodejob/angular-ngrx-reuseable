import { EntityAdapter, EntityState } from "@ngrx/entity";

export enum ApiStatus {
  Pending = "pending",
  Fulfilled = "fulfilled",
  Failure = "failure",
  Idle = "idle",
}
export interface ApiEntityState<T> extends EntityState<T> {
  status: ApiStatus;
  error: any;
}

export function createApiEntityState<T>(adapter: EntityAdapter<T>): ApiEntityState<T> {
  return {
    ...adapter.getInitialState(),
    status: ApiStatus.Idle,
    error: null,
  };
}
