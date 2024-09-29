import { EntityAdapter } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { createEntityApiActions } from "./api-entity.action";
import { ApiEntityState } from "./api-entity.state";

export function createApiEntityReducer<T>(
  actions: ReturnType<typeof createEntityApiActions<T>>,
  adapter: EntityAdapter<T>,
  initialState: ApiEntityState<T>
) {
  return createReducer(
    initialState,
    on(actions.fetch, state => ({ ...state, loading: true })),
    on(actions.fetchSuccess, (state, { data }) =>
      adapter.setMany(data, { ...state, loading: false })
    ),
    on(actions.fetchFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error,
    }))
  );
}
