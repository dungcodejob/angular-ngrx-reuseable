import { inject } from "@angular/core";
import { ListResponseDto } from "@core/http";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { concatLatestFrom, mapResponse } from "@ngrx/operators";
import { isNotNil } from "@shared/utils/is-not";
import { Observable, of, switchMap } from "rxjs";
import { createEntityApiActions } from "./api-entity.action";
import { ApiStatus } from "./api-entity.state";

export abstract class ApiEntityEffect {
  private readonly _actions$ = inject(Actions);

  createApiEntityEffect<TEntity, TParams = unknown>(
    actions: ReturnType<typeof createEntityApiActions<TEntity, TParams>>,
    fetchFn: (params: TParams) => Observable<ListResponseDto<TEntity>>,
    entities$?: Observable<TEntity[]>,
    status$?: Observable<ApiStatus>
  ) {
    if (isNotNil(entities$) && isNotNil(status$)) {
      return createEffect(() =>
        this._actions$.pipe(
          ofType(actions.fetch),
          concatLatestFrom(() => [entities$, status$]),
          switchMap(([action, entities, status]) => {
            if (status === ApiStatus.Fulfilled) {
              return of(actions.fetchSuccess({ data: entities }));
            }

            return fetchFn(action.params).pipe(
              mapResponse({
                next: res => actions.fetchSuccess({ data: res.result.items }),
                error: error => actions.fetchFailure({ error }),
              })
            );
          })
        )
      );
    }
    return createEffect(() =>
      this._actions$.pipe(
        ofType(actions.fetch),
        switchMap(action =>
          fetchFn(action.params).pipe(
            mapResponse({
              next: res => actions.fetchSuccess({ data: res.result.items }),
              error: error => actions.fetchFailure({ error }),
            })
          )
        )
      )
    );
  }
}
