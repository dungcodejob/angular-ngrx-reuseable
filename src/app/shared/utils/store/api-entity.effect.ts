import { inject } from "@angular/core";
import { ListResponseDto } from "@core/http";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { mapResponse } from "@ngrx/operators";
import { Observable, switchMap } from "rxjs";
import { createEntityApiActions } from "./api-entity.action";

export abstract class ApiEntityEffect {
  private readonly _actions$ = inject(Actions);

  createApiEntityEffect<TEntity, TParams = unknown>(
    actions: ReturnType<typeof createEntityApiActions<TEntity, TParams>>,
    fetchFn: (params: TParams) => Observable<ListResponseDto<TEntity>>
  ) {
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
