import { AsyncPipe } from "@angular/common";
import { Component, inject } from "@angular/core";
import { ActivatedRoute, Router, RouterOutlet } from "@angular/router";
import { provideDynamicForm, TextBoxField } from "@shared/ui/dynamic-form";
import { defer, filter, map, merge, Observable, of, switchMap } from "rxjs";
import { FormComponent } from "../../../shared/ui/dynamic-form/form/form.component";
import { HomeShellFacade } from "./home-shell.facade";

interface ViewModel {
  hasHeader: boolean;
  hasSideBar: boolean;
}

@Component({
  selector: "app-layout",
  standalone: true,
  imports: [RouterOutlet, AsyncPipe, FormComponent],
  providers: [HomeShellFacade, provideDynamicForm()],
  templateUrl: "./home-shell.component.html",
  styleUrl: "./home-shell.component.scss",
})
export class HomeShellComponent {
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _router = inject(Router);
  private readonly _facade = inject(HomeShellFacade);

  fields = [
    new TextBoxField({
      label: "Username",
      key: "username",
      value: null,
    }),
    new TextBoxField({
      label: "Password",
      key: "password",
      value: null,
    }),
  ];

  public vm$: Observable<ViewModel> = merge(
    this._router.events,
    this._activatedRoute.url
  ).pipe(
    switchMap(() =>
      defer(() =>
        this._activatedRoute.firstChild
          ? this._activatedRoute.firstChild?.data.pipe(
              filter(Boolean),
              map(data => ({
                hasHeader: data["hasHeader"] !== false,
                hasSideBar: data["hasSideBar"] !== false,
              }))
            )
          : of({ hasHeader: true, hasSideBar: true })
      )
    )
  );
}
