import { createAction, props } from "@ngrx/store";

export function createEntityApiActions<TEntity, TParams = unknown>(
  name: Capitalize<string>
) {
  return {
    fetch: createAction(`[${name}] Fetch`, props<{ params: TParams }>()),
    fetchSuccess: createAction(`[${name}] Fetch Success`, props<{ data: TEntity[] }>()),
    fetchFailure: createAction(`[${name}] Fetch Failure`, props<{ error: any }>()),
  };
}
