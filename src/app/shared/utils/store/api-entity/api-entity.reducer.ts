import { EntityAdapter } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { createEntityApiActions } from "./api-entity.action";
import { ApiEntityState, ApiStatus } from "./api-entity.state";

export function createApiEntityReducer<T>(
  actions: ReturnType<typeof createEntityApiActions<T>>,
  adapter: EntityAdapter<T>,
  initialState: ApiEntityState<T>
) {
  return createReducer(
    initialState,
    on(actions.fetch, state => ({ ...state, status: ApiStatus.Pending })),
    on(actions.fetchSuccess, (state, { data }) =>
      adapter.setMany(data, { ...state, status: ApiStatus.Fulfilled })
    ),
    on(actions.fetchFailure, (state, { error }) => ({
      ...state,
      status: ApiStatus.Failure,
      error,
    }))
  );
}
